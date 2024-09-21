import { z } from 'zod';

// Definir o schema do Zod para o formulário de Aluno
export const alunoSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  foto: z.string(),
  tipo: z.string().min(1, 'Tipo é obrigatório'),
  dataNascimento: z.string().refine(
    (value) => !isNaN(Date.parse(value)), 
    'Data de nascimento inválida'
  ),
  telefone: z.string().min(10, 'Telefone inválido').optional(),
  objetivos: z.string().optional(),
  tipoPlano: z.string().optional(),
  statusPagamento: z.string().optional(),
  informacoesMedicas: z.string().optional(),
  preferenciasTreino: z.string().optional(),
  ativo: z.boolean(),
  enderecos: z.array(
    z.object({
      rua: z.string().optional(),
      numero: z.string().optional(),
      complemento: z.string().optional(),
      bairro: z.string().optional(),
      cidade: z.string().optional(),
      estado: z.string().optional(),
      codigoPostal: z.string().optional(),
      pais: z.string().optional(),
    })
  ).optional(),
});

// Tipos inferidos a partir do schema
export type AlunoFormData = z.infer<typeof alunoSchema>;
