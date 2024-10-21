'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import api from '@/api/axios';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const tiposDeAulas = [
  { label: "Online", value: "online" },
  { label: "Presencial", value: "presencial" },
  { label: "Gravado", value: "gravado" },
];

// Validação de formulário Zod
const aulaSchema = z.object({
    nome: z.string().min(2, 'O nome da aula deve ter pelo menos 2 caracteres'),
    descricao: z.string().optional(),
    foto: z.string().url('A URL da imagem deve ser válida').optional(),
    video: z.string().url('A URL do vídeo deve ser válida').optional().or(z.literal('')), 
    tipo: z.string().min(1, 'O tipo de aula é obrigatório'),
    data: z.string().min(1, 'A data é obrigatória'),
    horario: z.string().min(1, 'O horário é obrigatório'),
    numeroVagas: z.number().min(1, 'Número de vagas deve ser pelo menos 1'),
  });

type AulaFormValues = z.infer<typeof aulaSchema>;

export default function AulaForm() {
  const form = useForm<AulaFormValues>({
    resolver: zodResolver(aulaSchema),
    defaultValues: {
      nome: '',
      descricao: '',
      foto: '',
      video: '', 
      tipo: '',
      data: '',
      horario: '',
      numeroVagas: 1,
    },
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const aulaId = searchParams.get('id');  // Obtém o ID da aula no edit
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAula = async () => {
      if (aulaId) {
        setLoading(true);
        try {
          const { data } = await api.get(`/Aulas/GET/${aulaId}`);
          
          const formattedData = {
            ...data,
            data: data.data.split('T')[0], 
          };
          
          form.reset(formattedData);
        } catch (err) {
          setError('Erro ao carregar a aula. Tente novamente.');
        } finally {
          setLoading(false);
        }
      }
    };
    loadAula();
  }, [aulaId, form]);

  const onSubmit = async (data: AulaFormValues) => {
    setLoading(true);
    setError(null); 
    setSuccess(null); 
  
    try {
      let response;
      if (aulaId) {
        // Editar aula existente
        const updatedData = { ...data, id: aulaId };
        response = await api.put(`/Aulas/edit/${aulaId}`, updatedData);
        setSuccess('Aula atualizada com sucesso!');
        router.push('/home/Aulas');
      } else {
        // Criar nova aula
        response = await api.post('/Aulas/add', data);
        setSuccess('Aula cadastrada com sucesso!');
      }
  
      if (response.status === 200 || response.status === 201) {
        form.reset();
        router.push('/home/Aulas');
      }
    } catch (err: any) {
      setError('Erro ao processar a requisição: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-6 max-w-2xl w-full bg-white p-8 rounded-xl shadow-md"
        >
          <div className="text-center mb-4">
            <h2 className="text-3xl font-semibold text-gray-800">
              {aulaId ? 'Editar Aula' : 'Cadastro de Aula'}
            </h2>
            <p className="text-gray-500 mt-1">Preencha os detalhes da aula abaixo</p>
          </div>

          {/* Nome da Aula */}
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">Nome da Aula</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o nome da aula"
                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg p-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Descrição */}
          <FormField
            control={form.control}
            name="descricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Digite a descrição da aula"
                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg p-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tipo de Aula */}
          <FormField
            control={form.control}
            name="tipo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">Tipo de Aula</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg w-full p-2"
                  >
                    <option value="">Selecione um tipo</option>
                    {tiposDeAulas.map((tipo) => (
                      <option key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Data */}
          <FormField
            control={form.control}
            name="data"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">Data da Aula</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg p-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Horário */}
          <FormField
            control={form.control}
            name="horario"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">Horário da Aula</FormLabel>
                <FormControl>
                  <Input
                    type="time"
                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg p-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Número de Vagas */}
          <FormField
            control={form.control}
            name="numeroVagas"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">Número de Vagas</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg p-2"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))} // Garantindo que seja número
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* URL da Foto */}
          <FormField
            control={form.control}
            name="foto"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">URL da Imagem (Opcional)</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="Digite a URL da imagem (opcional)"
                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg p-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* URL do Vídeo */}
          <FormField
            control={form.control}
            name="video"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">URL do Vídeo (Opcional)</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="Digite a URL do vídeo (opcional)"
                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg p-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Botão de Enviar */}
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
            disabled={loading}
          >
            {loading ? 'Enviando...' : aulaId ? 'Atualizar Aula' : 'Cadastrar Aula'}
          </Button>

          {/* Feedback de sucesso ou erro */}
          {success && <p className="text-green-600 mt-4 text-center">{success}</p>}
          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        </form>
      </Form>
    </div>
  );
}
