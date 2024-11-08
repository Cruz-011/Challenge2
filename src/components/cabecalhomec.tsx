'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';

// Styled Components
const Header = styled.header`
  width: 100%;
  background-color: #1a1a1d;
  border-bottom: 2px solid #007bff; /* Alterado para azul */
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  top: 0;
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;

const Logo = styled.img`
  width: 180px; /* Ajuste do tamanho do logo */
  height: auto;
  cursor: pointer;

  @media (max-width: 480px) {
    width: 150px;
  }
`;

const Menu = styled.nav`
  display: flex;
  flex: 1;
  justify-content: center;

  @media (max-width: 768px) {
    justify-content: center;
    margin-top: 10px;
  }
`;

const NavItem = styled.div`
  margin: 0 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1); /* Efeito de zoom ao passar o mouse */
  }

  a {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center; /* Centraliza o texto */
  }
`;

const NavIcon = styled.img`
  width: 60px; /* Ajuste o tamanho do ícone conforme necessário */
  height: auto;
  margin-bottom: 5px; /* Espaçamento entre o ícone e o texto */
`;

const NavText = styled.span`
  color: #f1f1f1;
  font-size: 12px; /* Tamanho do texto reduzido */
  text-transform: uppercase; /* Estilo futurista */
  letter-spacing: 1px; /* Espaçamento entre letras */

  @media (max-width: 768px) {
    font-size: 11px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const ConfigContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const ConfigIcon = styled.img`
  width: 40px;
  height: 40px;
  filter: brightness(0.9);

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
  }
`;

const ConfigText = styled.span`
  color: #f1f1f1;
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 11px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 60px; /* Ajuste conforme necessário */
  right: 0;
  background-color: rgba(26, 26, 29, 0.95); /* Fundo semi-transparente */
  border: 1px solid #007bff; /* Alterado para azul */
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
  z-index: 1000;
`;

const DropdownItem = styled.button`
  background: none;
  border: none;
  color: #f1f1f1;
  padding: 10px 20px;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: #007bff; /* Alterado para azul */
    color: #fff;
  }

  &:focus {
    outline: none;
    background-color: #007bff; /* Alterado para azul */
    color: #fff;
  }
`;

// Componente Cabecalho
const CabecalhoMec: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState<string>('Usuário');
  const router = useRouter;
  const configRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleChangeName = () => {
    const newName = prompt('Digite seu novo nome:', userName);
    if (newName) {
      setUserName(newName);
    }
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (configRef.current && !configRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <Header>
      <Container>
        <Link href="/" passHref>
          <Logo src="/imagens/carchecknovo.png" alt="Logo" />
        </Link>

        <Menu>
          <NavItem>
            <Link href="/mecanico" passHref>
              <NavIcon src="/imagens/andamento.png" alt="Serviços em Andamento" />
              <NavText>Serviços em Andamento</NavText>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/servicosconcluido" passHref>
              <NavIcon src="/imagens/concluido.png" alt="Serviços Concluídos" />
              <NavText>Serviços Concluídos</NavText>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/servicopendente" passHref>
              <NavIcon src="/imagens/pendente.png" alt="Serviços Pendentes" />
              <NavText>Serviços Pendentes</NavText>
            </Link>
          </NavItem>
        </Menu>

        <ConfigContainer ref={configRef} onClick={toggleDropdown}>
          <ConfigIcon src="/imagens/configuracoes.png" alt="Configurações" />
          <ConfigText>Configurações</ConfigText>
          {isDropdownOpen && (
            <DropdownMenu>
              <span style={{ color: '#f1f1f1', padding: '10px 20px', textAlign: 'center' }}>
                Olá, {userName}
              </span>
              <DropdownItem onClick={handleChangeName}>Mudar Nome</DropdownItem>
            </DropdownMenu>
          )}
        </ConfigContainer>
      </Container>
    </Header>
  );
};

export default CabecalhoMec;
