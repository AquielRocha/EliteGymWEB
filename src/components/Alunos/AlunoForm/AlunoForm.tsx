'use client';

import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import InputMask from "react-input-mask";
// Schema de validação usando Zod
const alunoSchema = z.object({
  nome: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Formato de email inválido'),
  telefone: z
    .string()
    .min(10, 'O telefone deve ter no mínimo 10 caracteres')
    .max(15, 'O telefone deve ter no máximo 15 caracteres'),
  objetivos: z.string().optional(),
  dataNascimento: z.string().nonempty('A data de nascimento é obrigatória'),
});

type AlunoFormValues = z.infer<typeof alunoSchema>;

export default function AlunoForm() {
  const form = useForm<AlunoFormValues>({
    resolver: zodResolver(alunoSchema),
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      objetivos: '',
      dataNascimento: '',
    },
  });

  const onSubmit = (data: AlunoFormValues) => {
    console.log(data);
    // Aqui você pode enviar os dados para o backend
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto p-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Cadastro de Aluno</h2>
        </div>

        {/* Campo Nome */}
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

       
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Digite o email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
  control={form.control}
  name="telefone"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Telefone</FormLabel>
      <FormControl>
        <Controller
          name="telefone"
          control={form.control}
          render={({ field }) => (
            <InputMask
              mask="(99) 99999-9999"
              value={field.value}
              onChange={field.onChange}
            >
              {(inputProps: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
                <Input {...inputProps} />
                
              )}
            </InputMask>
          )}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

        {/* Campo Data de Nascimento */}
        <FormField
          control={form.control}
          name="dataNascimento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Nascimento</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Objetivos */}
        <FormField
          control={form.control}
          name="objetivos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Objetivos</FormLabel>
              <FormControl>
                <Textarea placeholder="Digite seus objetivos" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Cadastrar Aluno
        </Button>
      </form>
    </Form>
  );
}
