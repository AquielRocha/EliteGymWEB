import { z } from 'zod';

export const aparelhoSchema = z.object({
  id: z.number().optional(),
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string().optional(),
  foto: z.string().optional(),
  categoria: z.string().min(1, 'Categoria é obrigatória'),
  manutencao: z.boolean(),
  favorite: z.boolean().optional(), 
});

export type AparelhoFormData = z.infer<typeof aparelhoSchema>;
