"use client";

import React, { useState } from 'react';
import Cabecalho from '../../components/cabecalho';
import Chat from '../../components/chat'; 
import Testemunhos from '../inicio/testemunho'; 
import FAQ from '../inicio/FAQ'; 
import styles from '../assets/Inicio.module.css';
import Image from 'next/image';



const Inicio: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const openChat = () => {
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      <Cabecalho />

      <div className={styles.mainContent}>
        <div className={styles.heroSection}>
          <h1>Bem-vindo à Car Check</h1>
          <p>
            Seu diagnóstico automotivo em minutos. Clique abaixo para iniciar seu diagnóstico personalizado e receber um orçamento!
          </p>
          <button className={styles.primaryButton} onClick={openChat}>
            INICIAR CHAT
          </button>
        </div>

        <div className={styles.benefitsSection}>
          <h2>Nossos Benefícios</h2>
          <div className={styles.benefitsContainer}>
            <div className={styles.benefitCard}>
              <Image src="/imagens/tempo.png" alt="Economia de Tempo" width={60} height={60} />
              <h3>Economia de Tempo</h3>
              <p>Diagnóstico e orçamento em minutos, sem sair de casa.</p>
            </div>
            <div className={styles.benefitCard}>
              <Image src="/imagens/money.png" alt="Melhores Preços" width={60} height={60} />
              <h3>Melhores Preços</h3>
              <p>Inteligência artificial para encontrar os menores preços do mercado.</p>
            </div>
            <div className={styles.benefitCard}>
              <Image src="/imagens/cama.png" alt="Conforto" width={60} height={60} />
              <h3>Conforto</h3>
              <p>Autodiagnóstico sem necessidade de deixar o veículo na oficina.</p>
            </div>
            <div className={styles.benefitCard}>
              <Image src="/imagens/acessibilidade.png" alt="Acessibilidade" width={60} height={60} />
              <h3>Acessibilidade</h3>
              <p>Adaptado para todos os tipos de usuários.</p>
            </div>
            <div className={styles.benefitCard}>
              <Image src="/imagens/conexão.png" alt="Compatibilidade" width={60} height={60} />
              <h3>Compatibilidade</h3>
              <p>Identifica problemas em qualquer tipo de veículo.</p>
            </div>
          </div>
        </div>

        <Testemunhos />
        <FAQ />
      </div>

      {isChatOpen && <Chat onClose={closeChat} />}
    </>
  );
};

export default Inicio;
