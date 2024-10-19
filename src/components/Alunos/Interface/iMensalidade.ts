
export interface Mensalidade {
    id: number;
    valorMensalidade: number;
    dataVencimento: string; // ISO string ou Date, conforme preferência
    dataPagamento: string | null; // ISO string ou Date, ou null se não pago
    status: 'Pago' | 'Pendente' | 'Atrasado'; // Usando union types para status específicos
    plano: string | null; // Detalhes do plano, se aplicável
  }
  