// src/components/chat.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; // Importação correta para a nova estrutura do Next.js
import styles from '../../src/app/assets/Chat.module.css';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface ChatProps {
  onClose: () => void;
}

const Chat: React.FC<ChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const welcomeMessage: Message = {
      text: 'Oi! Aqui é o ChatBot da CarCheck. Pronto para te ajudar com o que precisar. Digite o número da opção que melhor descreve o que você busca.',
      sender: 'bot',
    };

    const optionsMessage: Message = {
      text: '1 - Estou tendo problemas com o meu veículo\n' +
            '2 - Problemas com uma manutenção feita recentemente\n' +
            '3 - Realizar Agendamento\n' +
            '4 - Suporte da conta\n',
      sender: 'bot',
    };

    setMessages([welcomeMessage, optionsMessage]);

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: Message = { text: message, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');

    if (message === '3') {
      router.push('/realizaragendamento');
      return;
    }

    try {
      const response = await fetch('https://next-50my.onrender.com/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text: message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage: Message = {
          text: data[0], // Pega a primeira resposta do Watson
          sender: 'bot',
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      } else {
        const botErrorMessage: Message = {
          text: 'Desculpe, não consegui entender a resposta do assistente.',
          sender: 'bot',
        };
        setMessages(prevMessages => [...prevMessages, botErrorMessage]);
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      const botErrorMessage: Message = {
        text: 'Desculpe, houve um erro ao processar sua mensagem.',
        sender: 'bot',
      };
      setMessages(prevMessages => [...prevMessages, botErrorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      sendMessage(input.trim());
    }
  };

  return (
    <div className={styles.chatOverlay}>
      <div className={styles.chatContainer}>
        <header className={styles.chatHeader}>
          <h2>Chat de Suporte</h2>
          <button onClick={onClose} className={styles.closeButton}>
            &times;
          </button>
        </header>
        <div className={styles.chatMessages}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={
                msg.sender === 'user'
                  ? styles.userMessageContainer
                  : styles.botMessageContainer
              }
            >
              <div
                className={
                  msg.sender === 'user'
                    ? styles.userMessage
                    : styles.botMessage
                }
              >
                {msg.text.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className={styles.chatInput}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
          />
          <button onClick={() => input.trim() && sendMessage(input.trim())}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
