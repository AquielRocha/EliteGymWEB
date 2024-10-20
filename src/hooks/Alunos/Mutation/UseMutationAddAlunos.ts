
import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface CreateAlunoComEnderecosDto {
  Nome: string;
  Email: string;
  Foto: string;
  Tipo: string;
  DataNascimento: string; // Enviado como string ISO
  Telefone: string;
  Objetivos: string;
  Ativo: boolean;
  PlanoId: number;
  Enderecos?: EnderecoDto[];
}

export interface EnderecoDto {
  Rua: string;
  Numero: string;
  Complemento?: string;
  Bairro: string;
  Cidade: string;
  Estado: string;
  CodigoPostal: string;
  Pais: string;
}

// Função de mutação para adicionar aluno
const useMutationAddAlunos = async (createAlunoComEnderecosDto: CreateAlunoComEnderecosDto) => {
  try {
    const response = await api.post('/Alunos/add', createAlunoComEnderecosDto);
    return response.data;
  } catch (error) {
    throw new Error((error as any).response.data || 'Erro ao adicionar aluno.');
  }
};

export default useMutationAddAlunos;
