import { iPlanos } from './iPlanos'; // Importando o modelo correto de Plano

export interface Mensalidade {
  id: number;
  valorMensalidade: number;
  dataVencimento: string;
  dataPagamento: string | null;
  status: 'Pago' | 'Pendente' | 'Atrasado';
  plano: iPlanos | null; // Agora plano pode ser um objeto completo, ao invés de uma string
}
