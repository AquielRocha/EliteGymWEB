import api from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { Aluno } from "@/components/Alunos/Interface/iAluno";

async function getAllAlunos(): Promise<Aluno[]> {
  try {
    const response = await api.get("/Alunos/GetAll");
    console.log("Resposta da API:", response.data);

    // Verifica se response.data é um array
    if (Array.isArray(response.data)) {
      // Mapeia os dados para garantir que a estrutura esteja conforme a interface Aluno
      const alunos = response.data.map((item: any) => ({
        id: item.id || 0,
        nome: item.nome || "",
        email: item.email || "",
        fotoBase64: item.fotoBase64 || "",
        tipo: item.tipo || "",
        dataNascimento: item.dataNascimento || "",
        telefone: item.telefone || "",
        dataCadastro: item.dataCadastro || "",
        objetivos: item.objetivos || "",
        ativo: item.ativo ?? false,
        enderecos: item.enderecos?.map((endereco: any) => ({
          id: endereco.id || 0,
          rua: endereco.rua || "",
          numero: endereco.numero || "",
          complemento: endereco.complemento || "",
          bairro: endereco.bairro || "",
          cidade: endereco.cidade || "",
          estado: endereco.estado || "",
          codigoPostal: endereco.codigoPostal || "",
          pais: endereco.pais || ""
        })) || [],
        mensalidades: item.mensalidades?.map((mensalidade: any) => ({
          id: mensalidade.id || 0,
          valorMensalidade: mensalidade.valorMensalidade || 0,
          dataVencimento: mensalidade.dataVencimento || "",
          dataPagamento: mensalidade.dataPagamento || null,
          status: mensalidade.status || "Pendente",
          plano: mensalidade.plano || null
        })) || []
      })) as Aluno[];

      return alunos;
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
