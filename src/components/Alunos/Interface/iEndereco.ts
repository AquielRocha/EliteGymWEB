// src/interfaces/Endereco.ts

export interface Endereco {
    id: number;
    rua: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    codigoPostal: string;
    pais: string;
  }
  