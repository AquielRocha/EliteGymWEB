import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";


export interface iPlanos{
id: number;
nome: string;
valor: number;
descricao: string;

}

async function getAllPlanos() { 
  try {
    const response = await api.get("/Planos");
    console.log("Resposta da API:", response.data);

    // Verifica se response.data é um array
    if (Array.isArray(response.data)) {
      return response.data as iPlanos[];
    } else {
      console.error("Dados dos planos não encontrados ou formato inesperado.");
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar planos:", error);
    throw new Error("Erro ao buscar planos");
  }
}

export function useQueryGetAllPlanos() {
  return useQuery<iPlanos[], Error>({
    queryKey: ["Planos", "planos"],
    queryFn: getAllPlanos,
    staleTime: 1000 * 60 * 5, 
  });
}
