import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

interface Aula {
  id: number;
  nome: string;
  descricao: string;
  foto: string;
  video: string;
  tipo: string;
  data: string;
  horario: string;
  numeroVagas: number;
}

async function getAllAulas() {
  try {
    const response = await api.get("/Aulas/getAll");
    if (response.data && Array.isArray(response.data)) {
      return response.data.map((aula: any) => ({
        ...aula,
        video: aula.video || "",
      })) as Aula[];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar aulas:", error);
    return [];
  }
}

export function useQueryGetAllAulas() {
  return useQuery({
    queryKey: ["Aulas", "aulas"],
    queryFn: getAllAulas,
    retry: 2,
  });
}
