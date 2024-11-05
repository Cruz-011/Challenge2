'use client';
import React, { useEffect, useState } from 'react';
import styles from '../assets/VeiculosSalvos.module.css';
import Cabecalho from '../../components/cabecalho';

interface Vehicle {
  veiculo_id: number;
  cliente_id: number;
  marca: string;
  modelo: string;
  ano_fabricacao: string;
  numero_chassi: string;
}

const VeiculosSalvosPage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [vehicleToEdit, setVehicleToEdit] = useState<Vehicle | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('http://localhost:8080/veiculos');
        if (!response.ok) throw new Error('Erro ao buscar veículos do banco de dados');
        
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        console.error(error);
        setErrorMessage('Não foi possível carregar os veículos. Verifique a conexão com a API.');
      }
    };
    fetchVehicles();
  }, []);

  const handleEdit = (index: number) => {
    const vehicle = vehicles[index];
    setVehicleToEdit(vehicle);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (vehicleToEdit && editIndex !== null) {
      try {
        const response = await fetch(`http://localhost:8080/veiculos`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(vehicleToEdit),
        });
        if (!response.ok) throw new Error('Erro ao atualizar o veículo');

        const updatedVehicles = [...vehicles];
        updatedVehicles[editIndex] = vehicleToEdit;
        setVehicles(updatedVehicles);
        setShowModal(false);
        setVehicleToEdit(null);
        setEditIndex(null);
      } catch (error) {
        console.error(error);
        setErrorMessage('Não foi possível salvar as alterações. Tente novamente.');
      }
    }
  };

  const handleDelete = async (index: number) => {
    const vehicleToDelete = vehicles[index];
    try {
      const response = await fetch(`http://localhost:8080/veiculos/${vehicleToDelete.numero_chassi}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao excluir o veículo');

      const updatedVehicles = vehicles.filter((_, i) => i !== index);
      setVehicles(updatedVehicles);
    } catch (error) {
      console.error(error);
      setErrorMessage('Não foi possível excluir o veículo. Tente novamente.');
    }
  };

  return (
    <div>
      <Cabecalho />
      <div className={styles.vehiclesContainer}>
        <h2>Veículos Salvos</h2>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        {vehicles.length === 0 ? (
          <p>Nenhum veículo salvo.</p>
        ) : (
          <div className={styles.vehicleCardsContainer}>
            {vehicles.map((vehicle, index) => (
              <div key={vehicle.veiculo_id} className={styles.vehicleCard}>
                <h3>{vehicle.marca} {vehicle.modelo}</h3>
                <div className={styles.vehicleInfo}>
                  <p><strong>Ano:</strong> {vehicle.ano_fabricacao}</p>
                  <p><strong>Chassis:</strong> {vehicle.numero_chassi}</p>
                </div>
                <div className={styles.cardActions}>
                  <button className={styles.btnEditar} onClick={() => handleEdit(index)}>Editar</button>
                  <button className={styles.btnExcluir} onClick={() => handleDelete(index)}>Excluir</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && vehicleToEdit && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Editar Veículo</h3>
            <input
              type="text"
              value={vehicleToEdit.marca}
              onChange={(e) => setVehicleToEdit({ ...vehicleToEdit, marca: e.target.value })}
              placeholder="Marca"
              className={styles.input}
            />
            <input
              type="text"
              value={vehicleToEdit.modelo}
              onChange={(e) => setVehicleToEdit({ ...vehicleToEdit, modelo: e.target.value })}
              placeholder="Modelo"
              className={styles.input}
            />
            <input
              type="text"
              value={vehicleToEdit.ano_fabricacao}
              onChange={(e) => setVehicleToEdit({ ...vehicleToEdit, ano_fabricacao: e.target.value })}
              placeholder="Ano de Fabricação"
              className={styles.input}
            />
            <input
              type="text"
              value={vehicleToEdit.numero_chassi}
              onChange={(e) => setVehicleToEdit({ ...vehicleToEdit, numero_chassi: e.target.value })}
              placeholder="Chassis"
              className={styles.input}
            />
            <div className={styles.modalActions}>
              <button className={styles.btnSalvar} onClick={handleSave}>Salvar</button>
              <button className={styles.btnFechar} onClick={() => setShowModal(false)}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VeiculosSalvosPage;
