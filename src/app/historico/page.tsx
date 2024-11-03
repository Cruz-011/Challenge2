"use client";

import React, { useState, useMemo, useCallback } from 'react';
import Cabecalho from '../../components/cabecalho';
import styled from 'styled-components';
import { FaSort } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Servico {
  id: number;
  descricao: string;
  status: 'Concluído' | 'Cancelado' | 'Em andamento';
  veiculo: string;
  data: string;
}

const initialServicos: Servico[] = [
  { id: 1, descricao: 'Troca de óleo', status: 'Concluído', veiculo: 'Honda Civic 2020', data: '15/09/2024' },
  { id: 2, descricao: 'Revisão de freios', status: 'Em andamento', veiculo: 'Toyota Corolla 2019', data: '16/09/2024' },
  { id: 3, descricao: 'Alinhamento e balanceamento', status: 'Concluído', veiculo: 'Ford Ka 2018', data: '17/09/2024' },
  { id: 4, descricao: 'Substituição de amortecedores', status: 'Cancelado', veiculo: 'Chevrolet Onix 2021', data: '18/09/2024' },
];

const MainContainer = styled.main`
  background-color: #1e1e1e;
  padding: 20px;
  min-height: 100vh;  
  color: black;

`;

const Title = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 30px;
`;

const SearchFilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  gap: 10px;
`;

const InputSelectStyle = styled.input`
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  width: 48%;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const StatusFilter = styled.select`
  ${InputSelectStyle}
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
`;

const StyledThead = styled.thead`
  background-color: #007bff;
  color: black;
`;

const StyledTh = styled.th`
  padding: 12px 15px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const StyledTbody = styled.tbody`
  background-color: #ffffff;
`;

const StyledTr = styled.tr<{ isEven: boolean }>`
  background-color: ${({ isEven }) => (isEven ? '#f9f9f9' : '#ffffff')};

  &:hover {
    background-color: #f1f1f1;
  }
`;

const StyledTd = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #ddd;
  color: black;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 5px 10px;
  border-radius: 12px;
  color: #ffffff;
  font-size: 12px;
  background-color: ${({ status }) => {
    switch (status) {
      case 'Concluído': return '#28a745';
      case 'Cancelado': return '#dc3545';
      case 'Em andamento': return '#ffc107';
      default: return '#6c757d';
    }
  }};
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const HelpButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #0056b3;
  }
`;

const ModalOverlay = styled.div<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #1e1e1e;
  padding: 30px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  color: #ffffff;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    color: #dc3545;
  }
`;

const HistoricoServicos: React.FC = () => {
  const [servicos, setServicos] = useState<Servico[]>(initialServicos);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('Todos');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Servico; direction: 'ascending' | 'descending' } | null>(null);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);

  const itemsPerPage = 3;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value);
  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value);

  const filteredServicos = useMemo(() => {
    return servicos.filter(servico =>
      (statusFilter === 'Todos' || servico.status === statusFilter) &&
      (servico.descricao.toLowerCase().includes(searchTerm.toLowerCase()) || servico.veiculo.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [servicos, searchTerm, statusFilter]);

  const sortedServicos = useMemo(() => {
    let sortableItems = [...filteredServicos];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredServicos, sortConfig]);

  const pageCount = Math.ceil(sortedServicos.length / itemsPerPage);
  const displayedServicos = useMemo(() => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedServicos.slice(start, end);
  }, [currentPage, sortedServicos]);

  const requestSort = useCallback((key: keyof Servico) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  }, [sortConfig]);

  const toggleHelpModal = () => setIsHelpModalOpen(prev => !prev);

  return (
    <MainContainer>
      <Cabecalho />
      <Title>Histórico de Serviços</Title>
      
      <SearchFilterContainer>
        <InputSelectStyle 
          type="text" 
          placeholder="Buscar por descrição ou veículo" 
          value={searchTerm} 
          onChange={handleSearchChange} 
        />
        <StatusFilter value={statusFilter} onChange={handleStatusFilterChange}>
          <option value="Todos">Todos</option>
          <option value="Concluído">Concluído</option>
          <option value="Cancelado">Cancelado</option>
          <option value="Em andamento">Em andamento</option>
        </StatusFilter>
      </SearchFilterContainer>

      <TableContainer>
        <StyledTable>
          <StyledThead>
            <tr>
              <StyledTh onClick={() => requestSort('data')}>Data <FaSort /></StyledTh>
              <StyledTh onClick={() => requestSort('descricao')}>Descrição <FaSort /></StyledTh>
              <StyledTh onClick={() => requestSort('veiculo')}>Veículo <FaSort /></StyledTh>
              <StyledTh onClick={() => requestSort('status')}>Status <FaSort /></StyledTh>
            </tr>
          </StyledThead>
          <StyledTbody>
            {displayedServicos.map((servico, index) => (
              <StyledTr key={servico.id} isEven={index % 2 === 0}>
                <StyledTd>{servico.data}</StyledTd>
                <StyledTd>{servico.descricao}</StyledTd>
                <StyledTd>{servico.veiculo}</StyledTd>
                <StyledTd><StatusBadge status={servico.status}>{servico.status}</StatusBadge></StyledTd>
              </StyledTr>
            ))}
          </StyledTbody>
        </StyledTable>
      </TableContainer>

      <PaginationContainer>
        <ReactPaginate
          previousLabel={"← Anterior"}
          nextLabel={"Próxima →"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          containerClassName={"pagination"}
          activeClassName={"selected"}
          previousClassName={"page"}
          nextClassName={"page"}
          pageClassName={"page"}
          disabledClassName={"disabled"}
        />
      </PaginationContainer>

      <HelpButton onClick={toggleHelpModal}>?</HelpButton>

      <ModalOverlay isVisible={isHelpModalOpen}>
        <ModalContent>
          <CloseButton onClick={toggleHelpModal}>×</CloseButton>
          <h2>Ajuda</h2>
          <p>Aqui estão algumas informações de como usar o histórico de serviços:</p>
          <ul>
            <li>Use a barra de busca para filtrar por descrição ou veículo.</li>
            <li>Altere o filtro de status para exibir serviços específicos.</li>
            <li>Clique nos cabeçalhos para ordenar a lista.</li>
          </ul>
        </ModalContent>
      </ModalOverlay>

      <ToastContainer />
    </MainContainer>
  );
};

export default HistoricoServicos;
