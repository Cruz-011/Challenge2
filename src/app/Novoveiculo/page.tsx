'use client';
import React, { useState } from 'react';
import Cabecalho from '../../components/cabecalho';
import styles from '../assets/NovoVeiculo.module.css';
import Rodape from '@/components/rodape';

interface VehicleData {
  marca: string;
  modelo: string;
  ano: string;
  combustivel: string;
  placa: string;
  chassis: string;
}

const isValidVehicleData = (data: any): data is VehicleData => {
  return (
    typeof data.marca === 'string' &&
    typeof data.modelo === 'string' &&
    typeof data.ano === 'string' &&
    typeof data.combustivel === 'string' &&
    typeof data.placa === 'string' &&
    typeof data.chassis === 'string'
  );
};

const NovoVeiculo: React.FC = () => {
  const [veiculoSalvo, setVeiculoSalvo] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const vehicleData = Object.fromEntries(formData.entries()) as unknown;

    // Valida os dados do veículo
    if (isValidVehicleData(vehicleData)) {
      // Salva os dados do veículo no localStorage
      const vehicles = JSON.parse(localStorage.getItem('vehicles') || '[]');
      vehicles.push(vehicleData);
      localStorage.setItem('vehicles', JSON.stringify(vehicles));

      setVeiculoSalvo(true);
    } else {
      console.error('Dados do veículo inválidos:', vehicleData);
    }
  };

  return (
    <div className={styles.container}>
      <Cabecalho />
      <div className={styles.formContainer}>
        <h2>Cadastro de Veículo</h2>

        {veiculoSalvo ? (
          <div className={styles.message}>
            <p>Veículo salvo com sucesso!</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="marca">Marca:</label>
              <input className={styles.input} type="text" id="marca" name="marca" required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="modelo">Modelo:</label>
              <input className={styles.input} type="text" id="modelo" name="modelo" required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="ano">Ano:</label>
              <input className={styles.input} type="number" id="ano" name="ano" required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="combustivel">Combustível:</label>
              <select className={styles.select} id="combustivel" name="combustivel" required>
                <option value="alcool">Álcool</option>
                <option value="gasolina">Gasolina</option>
                <option value="diesel">Diesel</option>
                <option value="hibrido">Híbrido</option>
                <option value="eletrico">100% Elétrico</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="placa">Placa:</label>
              <input className={styles.input} type="text" id="placa" name="placa" required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="chassis">Chassis:</label>
              <input className={styles.input} type="text" id="chassis" name="chassis" required />
            </div>

            <button className={styles.button} type="submit">Salvar</button>
          </form>
        )}
      </div>
      <Rodape />
    </div>
  );
};

export default NovoVeiculo;
