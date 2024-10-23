import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";

interface Mensalidade {
  id: number;
  valorMensalidade: number;
  dataVencimento: string;
  dataPagamento: string | null;
  status: string;
  plano: {
    id: number;
    nome: string;
  };
}

async function getMensalidadesPendentes(): Promise<Mensalidade[]> {
  try {
    const response = await api.get("/Mensalidades/Pendentes");
    if (response.data && Array.isArray(response.data)) {
      return response.data.map((mensalidade: any) => ({
        ...mensalidade,
        dataPagamento: mensalidade.dataPagamento || null,
        status: mensalidade.status || "Pendente",
      })) as Mensalidade[];
    } else {
      console.error("Nenhuma mensalidade pendente encontrada.");
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar mensalidades pendentes:", error);
    return [];
  }
}

export function useQueryGetMensalidadesPendentes() {
  return useQuery({
    queryKey: ["Mensalidades", "pendentes"],
    queryFn: getMensalidadesPendentes,
    staleTime: 1000 * 60 * 5,
  });
}
