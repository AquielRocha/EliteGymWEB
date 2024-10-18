// hooks/Pageinicial/useQueryGetAll.ts
import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { Aluno } from "@/components/Alunos/Interface/iAluno";

async function getAllAlunos(): Promise<Aluno[]> {
  try {
    const response = await api.get("/Alunos/GetAll");
    console.log("Resposta da API:", response.data);

    // Verifica se response.data é um array
    if (Array.isArray(response.data)) {
      return response.data as Aluno[];
    } else {
      console.error("Dados dos alunos não encontrados ou formato inesperado.");
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
    throw new Error("Erro ao buscar alunos");
  }
}

export function useQueryGetAllAlunos() {
  return useQuery<Aluno[], Error>({
    queryKey: ["Alunos", "alunos"],
    queryFn: getAllAlunos,
    staleTime: 1000 * 60 * 5, 
  });
}
