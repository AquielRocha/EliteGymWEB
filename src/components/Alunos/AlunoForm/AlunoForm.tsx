'use client';

import { z } from 'zod';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import InputMask from "react-input-mask";
import { Select } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import axios from 'axios'; // Supondo que usaremos axios para buscar os planos

// Schema de validação usando Zod
const enderecoSchema = z.object({
  rua: z.string().min(1, 'Rua é obrigatória'),
  numero: z.string().min(1, 'Número é obrigatório'),
  complemento: z.string().optional(),
  bairro: z.string().min(1, 'Bairro é obrigatório'),
  cidade: z.string().min(1, 'Cidade é obrigatória'),
  estado: z.string().min(2, 'Estado é obrigatório'),
  codigoPostal: z.string().min(1, 'Código Postal é obrigatório'),
  pais: z.string().min(1, 'País é obrigatório'),
});

const alunoSchema = z.object({
  tipo: z.enum(['Aluno', 'Professor'], { errorMap: () => ({ message: 'Tipo de usuário é obrigatório' }) }),
  nome: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Formato de email inválido'),
  telefone: z
    .string()
    .min(10, 'O telefone deve ter no mínimo 10 caracteres')
    .max(15, 'O telefone deve ter no máximo 15 caracteres'),
  dataNascimento: z.string().nonempty('A data de nascimento é obrigatória'),
  foto: z.string().optional(),
  objetivos: z.string().optional(),
  planoId: z.number().min(1, 'Selecione um plano'),
  enderecos: z.array(enderecoSchema).min(1, 'Pelo menos um endereço é obrigatório'),
});

type AlunoFormValues = z.infer<typeof alunoSchema>;

export default function AlunoForm() {
  const form = useForm<AlunoFormValues>({
    resolver: zodResolver(alunoSchema),
    defaultValues: {
      tipo: '',
      nome: '',
      email: '',
      telefone: '',
      objetivos: '',
      dataNascimento: '',
      foto: '',
      planoId: 0,
      enderecos: [{
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        codigoPostal: '',
        pais: '',
      }],
    },
  });

  const { control, handleSubmit, setValue, watch } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'enderecos',
  });

  const [planos, setPlanos] = useState([]);
  const [fotoBase64, setFotoBase64] = useState('');

  useEffect(() => {
    // Função para buscar planos do backend
    const fetchPlanos = async () => {
      try {
        const response = await axios.get('/api/planos'); // Ajuste a URL conforme necessário
        setPlanos(response.data);
      } catch (error) {
        console.error('Erro ao buscar planos:', error);
      }
    };

    fetchPlanos();
  }, []);

  const onSubmit = async (data: AlunoFormValues) => {
    // Adicionar a foto em Base64 ao campo foto
    const formattedData = {
      ...data,
      foto: fotoBase64,
    };

    console.log('Dados enviados ao backend:', formattedData);
    // Aqui você pode enviar os dados para o backend, por exemplo, usando axios:
    /*
    try {
      await axios.post('/api/alunos', formattedData);
      alert('Aluno cadastrado com sucesso!');
      form.reset();
      setFotoBase64('');
    } catch (error) {
      console.error('Erro ao cadastrar aluno:', error);
      alert('Falha ao cadastrar aluno.');
    }
    */
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFotoBase64(base64String);
        setValue('foto', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto p-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Cadastro de Aluno</h2>
        </div>

        {/* Tipo de Usuário */}
        <FormField
          control={form.control}
          name="tipo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Usuário</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  options={[
                    { value: 'Aluno', label: 'Aluno' },
                    { value: 'Professor', label: 'Professor' },
                  ]}
                  onChange={(option: { value: string; label: string }) => field.onChange(option?.value)}
                  placeholder="Selecione o tipo de usuário"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Nome */}
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Completo</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Email */}
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

        {/* Campo Telefone */}
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

        {/* Campo Seleção de Plano
        <FormField
          control={form.control}
          name="planoId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Selecione o Plano</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  options={[
                    { value: 0, label: 'Selecione um plano' },
                    ...planos.map((plano: { nome: string; valor: number; id: number }) => ({
                      value: plano.id,
                      label: `${plano.nome} - R$${plano.valor}`,
                    })),
                  ]}
                  onChange={(option) => field.onChange(option?.value)}
                  placeholder="Selecione um plano"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* Campo Seleção de Foto */}
        <FormItem>
          <FormLabel>Foto</FormLabel>
          <FormControl>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </FormControl>
          {fotoBase64 && (
            <div className="mt-2">
              <img src={fotoBase64} alt="Foto do Aluno" className="w-32 h-32 object-cover rounded" />
            </div>
          )}
          <FormMessage />
        </FormItem>

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

        {/* Campos de Endereços */}
        <div>
          <Label>Endereços</Label>
          {fields.map((endereco, index) => (
            <div key={endereco.id} className="border p-4 mb-4 rounded">
              <h4 className="text-lg font-semibold mb-2">Endereço {index + 1}</h4>

              {/* Rua */}
              <FormField
                control={form.control}
                name={`enderecos.${index}.rua`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rua</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite a rua" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Número */}
              <FormField
                control={form.control}
                name={`enderecos.${index}.numero`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o número" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Complemento */}
              <FormField
                control={form.control}
                name={`enderecos.${index}.complemento`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complemento</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o complemento" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Bairro */}
              <FormField
                control={form.control}
                name={`enderecos.${index}.bairro`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o bairro" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Cidade */}
              <FormField
                control={form.control}
                name={`enderecos.${index}.cidade`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite a cidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Estado */}
              <FormField
                control={form.control}
                name={`enderecos.${index}.estado`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o estado" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Código Postal */}
              <FormField
                control={form.control}
                name={`enderecos.${index}.codigoPostal`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código Postal</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o código postal" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* País */}
              <FormField
                control={form.control}
                name={`enderecos.${index}.pais`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>País</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite o país" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Botão para remover endereço */}
              {fields.length > 1 && (
                <Button type="button" onClick={() => remove(index)} className="mt-2 bg-red-500">
                  Remover Endereço
                </Button>
              )}
            </div>
          ))}

          {/* Botão para adicionar novo endereço */}
          <Button type="button" onClick={() => append({
            rua: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: '',
            codigoPostal: '',
            pais: '',
          })}>
            Adicionar Endereço
          </Button>
        </div>

        {/* Botão de Submissão */}
        <Button type="submit" className="w-full">
          Cadastrar Aluno
        </Button>
      </form>
    </Form>
  );
}
