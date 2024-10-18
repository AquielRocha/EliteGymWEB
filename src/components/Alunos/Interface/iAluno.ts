
import { Endereco } from './iEndereco';
import { Mensalidade } from './iMensalidade';

export interface Aluno {
  id: number;
  nome: string;
  email: string;
  fotoBase64: string; // String Base64 da foto
  tipo: string;
  dataNascimento: string; // ISO string ou Date
  telefone: string;
  dataCadastro: string; // ISO string ou Date
  objetivos: string;
  ativo: boolean;
  enderecos: Endereco[]; // Lista de endereços
  mensalidades: Mensalidade[]; // Lista de mensalidades
  // Adicione outros campos conforme necessário
}
