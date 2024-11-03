// components/Rodape.tsx
'use client';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const FooterContainer = styled.footer`
  background-color: transparent;
  color: white;
  text-align: center;
  padding: 20px;
  width: 100%;
  margin-top: auto; /* Faz com que o rodapé fique no fim da página */
`;

const SupportContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const PortoSeguroLogo = styled.div`
  width: 100px;
  margin-top: -10px;
`;

const Rodape: React.FC = () => {
  return (
    <AppContainer>
      <FooterContainer>
        <p>&copy; 2024 CarCheck - Todos os direitos reservados</p>
        <SupportContainer>
          <p>Apoio Porto Seguro</p>
          <PortoSeguroLogo>
            <Image src="/imagens/porto.png" alt="Logo da Porto Seguro" width={100} height={50} />
          </PortoSeguroLogo>
        </SupportContainer>
      </FooterContainer>
    </AppContainer>
  );
};

export default Rodape;
