'use client';

import React, { useEffect, useState } from 'react';
import CabecalhoMec from '../../components/cabecalhomec';
import { FaTimes } from 'react-icons/fa';
import styles from '../assets/mecanico.module.css'; 
import { useRouter } from 'next/navigation';

interface Servico {
  codigo: string;
  nome: string;
  veiculo: string;
  data: string;
  hora: string;
  preco?: number;
  laudo: string;
}

const MecanicoHome: React.FC = () => {
  const [servicosEmAndamento, setServicosEmAndamento] = useState<Servico[]>([]);
  const [selectedService, setSelectedService] = useState<Servico | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Verifica se está no lado do cliente antes de acessar o localStorage
    if (typeof window !== "undefined") {
      const storedServicos = localStorage.getItem('servicosEmAndamento');
      if (storedServicos) {
        try {
          const parsedServicos = JSON.parse(storedServicos);
          setServicosEmAndamento(parsedServicos);
        } catch (error) {
          console.error("Erro ao parsear serviços em andamento:", error);
        }
      }
    }
  }, []);

  const handleComplete = (codigo: string) => {
    const updatedServicos = servicosEmAndamento.filter((servico) => servico.codigo !== codigo);
    const servicoCompleto = servicosEmAndamento.find((servico) => servico.codigo === codigo);

    if (typeof window !== "undefined") {
      const storedConcluidos = localStorage.getItem('servicosConcluidos') || '[]';
      const servicosConcluidos = JSON.parse(storedConcluidos);
      if (servicoCompleto) {
        servicosConcluidos.push(servicoCompleto);
      }

      setServicosEmAndamento(updatedServicos);
      localStorage.setItem('servicosEmAndamento', JSON.stringify(updatedServicos));
      localStorage.setItem('servicosConcluidos', JSON.stringify(servicosConcluidos));

      router.push('/servicosconcluido');
    }
  };

  const handleViewDetails = (servico: Servico) => {
    setSelectedService(servico);
  };

  const handleCloseDetails = () => {
    setSelectedService(null);
  };

  return (
    <div className={styles.container}>
      <CabecalhoMec />
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Serviços em Andamento</h1>

        {servicosEmAndamento.length === 0 ? (
          <p>Não há serviços em andamento.</p>
        ) : (
          <ul className={styles.servicesList}>
            {servicosEmAndamento.map((servico) => (
              <li className={styles.serviceItem} key={servico.codigo}>
                <div className={styles.serviceDetails}>
                  <strong>{servico.nome}</strong>
                  <span>{servico.veiculo}</span>
                </div>
                <div>
                  <button className={styles.viewDetailsButton} onClick={() => handleViewDetails(servico)}>
                    Ver Detalhes
                  </button>
                  <button className={styles.completeButton} onClick={() => handleComplete(servico.codigo)}>
                    Completar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {selectedService && (
          <div className={styles.detailsContainer}>
            <button className={styles.closeButton} onClick={handleCloseDetails}>
              <FaTimes />
            </button>
            <div className={styles.detailItem}>
              <strong>Código:</strong> {selectedService.codigo}
            </div>
            <div className={styles.detailItem}>
              <strong>Nome:</strong> {selectedService.nome}
            </div>
            <div className={styles.detailItem}>
              <strong>Veículo:</strong> {selectedService.veiculo}
            </div>
            <div className={styles.detailItem}>
              <strong>Data:</strong> {selectedService.data}
            </div>
            <div className={styles.detailItem}>
              <strong>Hora:</strong> {selectedService.hora}
            </div>
            <div className={styles.detailItem}>
              <strong>Status:</strong> Em andamento
            </div>
            <div className={styles.detailItem}>
              <strong>Preço Estipulado:</strong> R$ {selectedService.preco?.toFixed(2) || 'N/A'}
            </div>
            <div className={styles.detailItem}>
              <strong>O que será realizado:</strong> {selectedService.laudo}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MecanicoHome;
