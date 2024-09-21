import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";



export interface Endereco {
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  codigoPostal: string;
  pais: string;
}

export interface Aluno {
  id: number;
  nome: string;
  email: string;
  foto: string;
  tipo: string;
  dataNascimento: string; // ou Date se preferir
  telefone: string;
  objetivos: string;
  tipoPlano: string;
  statusPagamento: string;
  informacoesMedicas?: string;
  preferenciasTreino: string;
  aulas: number;
  ativo: boolean;
  enderecosJoin: Endereco[];
}
async function getAllAlunos() {
  try {
    const response = await api.get("Alunos/GetAll");
    console.log("Resposta da API:", response);

    // Acessa diretamente response.data se for um array
    if (response.data && Array.isArray(response.data)) {
      return response.data as Aluno[]; // Retorna o array de alunos
    } else {
      console.error("Dados dos alunos não encontrados");
      return []; // Retorna um array vazio em caso de erro
    }
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
    return []; // Retorna um array vazio em caso de erro
  }
}



export function useQueryGetAllAlunos() {
  return useQuery({
    queryKey: ["Alunos", "alunos"],
    queryFn: getAllAlunos, 
  });
}

