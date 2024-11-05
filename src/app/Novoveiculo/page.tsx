'use client';
import React, { useState } from 'react';
import Cabecalho from '../../components/cabecalho';
import styles from '../assets/NovoVeiculo.module.css';
import Rodape from '@/components/rodape';

interface VehicleData {
  cliente_id: number;
  marca: string;
  modelo: string;
  ano_fabricacao: string;
  numero_chassi: string;
}

const isValidVehicleData = (data: any): data is VehicleData => {
  return (
    typeof data.cliente_id === 'number' &&
    typeof data.marca === 'string' &&
    typeof data.modelo === 'string' &&
    typeof data.ano_fabricacao === 'string' &&
    typeof data.numero_chassi === 'string'
  );
};

const NovoVeiculo: React.FC = () => {
  const [veiculoSalvo, setVeiculoSalvo] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const vehicleData: Partial<VehicleData> = {
      cliente_id: Number(formData.get("cliente_id")),
      marca: String(formData.get("marca")),
      modelo: String(formData.get("modelo")),
      ano_fabricacao: String(formData.get("ano_fabricacao")),
      numero_chassi: String(formData.get("numero_chassi")),
    };

    if (isValidVehicleData(vehicleData)) {
      try {
        const response = await fetch('http://localhost:8080/veiculos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(vehicleData)
        });

        if (response.ok) {
          setVeiculoSalvo(true);
          setMessage("Veículo cadastrado com sucesso!");
          const formElement = event.currentTarget as HTMLFormElement;
          if (formElement) formElement.reset(); // Limpa o formulário após cadastro
        } else if (response.status === 409) {
          setMessage("Veículo com número de chassi já existe. Insira um valor exclusivo.");
        } else if (response.status === 400) {
          setMessage("Erro: Cliente ID não encontrado. Verifique o ID e tente novamente.");
        } else {
          setMessage("Erro ao cadastrar veículo. Tente novamente.");
        }
      } catch (error) {
        setMessage("Erro ao cadastrar veículo. Verifique sua conexão.");
        console.error("Erro ao conectar com a API:", error);
      }
    } else {
      console.error('Dados do veículo inválidos:', vehicleData);
      setMessage("Dados do veículo inválidos.");
    }
  };

  return (
    <div className={styles.container}>
      <Cabecalho />
      <div className={styles.formContainer}>
        <h2>Cadastro de Veículo</h2>

        {veiculoSalvo ? (
          <div className={styles.message}>
            <p>{message}</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="cliente_id">ID do Cliente:</label>
              <input className={styles.input} type="number" id="cliente_id" name="cliente_id" required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="marca">Marca:</label>
              <input className={styles.input} type="text" id="marca" name="marca" required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="modelo">Modelo:</label>
              <input className={styles.input} type="text" id="modelo" name="modelo" required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="ano_fabricacao">Ano de Fabricação:</label>
              <input className={styles.input} type="number" id="ano_fabricacao" name="ano_fabricacao" required />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="numero_chassi">Número do Chassi:</label>
              <input className={styles.input} type="text" id="numero_chassi" name="numero_chassi" required />
            </div>

            <button className={styles.button} type="submit">Salvar</button>
          </form>
        )}
        {message && !veiculoSalvo && <p className={styles.error}>{message}</p>}
      </div>
      <Rodape />
    </div>
  );
};

export default NovoVeiculo;
