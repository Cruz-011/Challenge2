const API_URL = "http://localhost:8080";

// Funções para Clientes

export async function fetchClientes() {
    const response = await fetch(`${API_URL}/clientes`);
    if (!response.ok) throw new Error("Erro ao buscar clientes");
    return response.json();
}

export async function fetchClienteById(id: any) {
    const response = await fetch(`${API_URL}/clientes/${id}`);
    if (!response.ok) throw new Error("Cliente não encontrado");
    return response.json();
}

export async function fetchClienteByCpf(cpf: any) {
    const response = await fetch(`${API_URL}/clientes/buscarCPF?cpf=${cpf}`);
    if (!response.ok) throw new Error("Cliente não encontrado");
    return response.json();
}

export async function createCliente(clienteData: any) {
    const response = await fetch(`${API_URL}/clientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clienteData),
    });
    if (!response.ok) throw new Error("Erro ao criar cliente");
    return response.json();
}

export async function updateCliente(clienteData: any) {
    const response = await fetch(`${API_URL}/clientes`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clienteData),
    });
    if (!response.ok) throw new Error("Erro ao atualizar cliente");
    return response.json();
}

export async function deleteCliente(cpf: any) {
    const response = await fetch(`${API_URL}/clientes/removerCPF?cpf=${cpf}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao remover cliente");
    return response.json();
}

// Funções para Veículos

export async function fetchVeiculos() {
    const response = await fetch(`${API_URL}/veiculos`);
    if (!response.ok) throw new Error("Erro ao buscar veículos");
    return response.json();
}

export async function fetchVeiculoByChassi(numeroChassi: any) {
    const response = await fetch(`${API_URL}/veiculos/${numeroChassi}`);
    if (!response.ok) throw new Error("Veículo não encontrado");
    return response.json();
}

export async function createVeiculo(veiculoData: any) {
    const response = await fetch(`${API_URL}/veiculos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(veiculoData),
    });
    if (!response.ok) throw new Error("Erro ao criar veículo");
    return response.json();
}

export async function updateVeiculo(veiculoData: any) {
    const response = await fetch(`${API_URL}/veiculos`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(veiculoData),
    });
    if (!response.ok) throw new Error("Erro ao atualizar veículo");
    return response.json();
}

export async function deleteVeiculo(numeroChassi: any) {
    const response = await fetch(`${API_URL}/veiculos/${numeroChassi}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao remover veículo");
    return response.json();
}
