"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Atualize a importação para o novo useRouter
import styled from 'styled-components';

const Header = styled.header`
  width: 100%;
  background-color: #1a1a1d;
  border-bottom: 2px solid #007bff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  top: 0;
  z-index: 999;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1850px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
  }
`;

const Logo = styled.div`
  width: 180px;
  height: auto;
  cursor: pointer;

  @media (max-width: 480px) {
    width: 150px;
  }
`;

const Menu = styled.nav`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const NavItem = styled.div`
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  a {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const NavIcon = styled.div`
  width: 40px;
  height: 40px;
  filter: brightness(0.9);

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    margin-top: 20px;
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    margin-top: 20px;
  }
`;

const NavText = styled.span`
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

const ConfigContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  margin: 0 10px;

  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const ConfigIcon = styled.div`
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
  top: 60px;
  right: 0;
  background-color: rgba(26, 26, 29, 0.95);
  border: 1px solid #007bff;
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
    background-color: #007bff;
    color: #fff;
  }

  &:focus {
    outline: none;
    background-color: #007bff;
    color: #fff;
  }
`;

const Cabecalho: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState<string>('Usuário'); 
  const router = useRouter();
  const configRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleChangeName = () => {
    const newName = prompt('Digite seu novo nome:', userName);
    if (newName) {
      setUserName(newName);
    }
  };

  const handleLogout = () => {
    router.push('/login');
  };

  const handlemecanico = () => {
    router.push('/mecanico');
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
          <Logo>
            <Image src="/imagens/carchecknovo.png" alt="Logo" width={180} height={60} />
          </Logo>
        </Link>

        <Menu>
          <NavItem>
            <Link href="/" passHref>
              <Image src="/imagens/botao-de-inicio.png" alt="Início" width={40} height={40} />
              <NavText>Início</NavText>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/servico" passHref>
              <Image src="/imagens/servico-tecnico.png" alt="Serviços" width={40} height={40} />
              <NavText>Serviços</NavText>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/historico" passHref>
              <Image src="/imagens/historico-de-pedidos.png" alt="Histórico" width={40} height={40} />
              <NavText>Histórico</NavText>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/Agendamentorealizado" passHref>
              <Image src="/imagens/agenda.png" alt="Agendamentos" width={40} height={40} />
              <NavText>Agendamentos</NavText>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/veiculosalvo" passHref>
              <Image src="/imagens/carro.png" alt="Veículos Salvos" width={40} height={40} />
              <NavText>Veículos Salvos</NavText>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/Novoveiculo" passHref>
              <Image src="/imagens/engarrafamento.png" alt="Novo Veículo" width={40} height={40} />
              <NavText>Novo Veículo</NavText>
            </Link>
          </NavItem>
        </Menu>

        <ConfigContainer ref={configRef} onClick={toggleDropdown}>
          <ConfigIcon>
            <Image src="/imagens/configuracoes.png" alt="Configuração" width={40} height={40} />
          </ConfigIcon>
          <ConfigText>Configurações</ConfigText>
          {isDropdownOpen && (
            <DropdownMenu>
              <DropdownItem onClick={handleChangeName}>Alterar nome</DropdownItem>
              <DropdownItem onClick={handlemecanico}>Mecânico</DropdownItem>
              <DropdownItem onClick={handleLogout}>Sair</DropdownItem>
            </DropdownMenu>
          )}
        </ConfigContainer>
      </Container>
    </Header>
  );
};

export default Cabecalho;
