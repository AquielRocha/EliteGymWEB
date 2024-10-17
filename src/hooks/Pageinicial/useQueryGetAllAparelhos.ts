import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

export interface Aparelho {
  id: number;
  nome: string;
  descricao: string;
  foto: string;
  categoria: string;
  manutencao: boolean;
  favorite: boolean;
}
async function getAllAparelhos() {
  try {
    const response = await api.get("Aparelhos/GetAll");
    console.log("Resposta da API:", response);

    if (response.data && Array.isArray(response.data)) {
      return response.data as Aparelho[];
    } else {
      console.error("Dados dos aparelhos não encontrados");
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar aparelhos:", error);
    return [];
  }
}

export function useQueryGetAllAparelhos() {
  return useQuery({
    queryKey: ["Aparelhos", "aparelhos"],
    queryFn: getAllAparelhos,
  });
}
