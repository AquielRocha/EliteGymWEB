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

const categoriasMusculos = [
  { label: "Braços", value: "braços" },
  { label: "Pernas", value: "pernas" },
  { label: "Costas", value: "costas" },
  { label: "Peito", value: "peito" },
  { label: "Abdômen", value: "abdômen" },
  { label: "Ombros", value: "ombros" },
];

// Validação de formulário usando Zod
const aparelhoSchema = z.object({
  nome: z.string().min(2, 'O nome do aparelho deve ter pelo menos 2 caracteres'),
  descricao: z.string().optional(),
  foto: z.string().url('A URL da imagem deve ser válida').optional(),
  categoria: z.string().min(1, 'A categoria é obrigatória'),
  manutencao: z.boolean(),
  favorite: z.boolean().optional(),
});

type AparelhoFormValues = z.infer<typeof aparelhoSchema>;

export default function AparelhoForm() {
  const form = useForm<AparelhoFormValues>({
    resolver: zodResolver(aparelhoSchema),
    defaultValues: {
      nome: '',
      descricao: '',
      foto: '',
      categoria: '',
      manutencao: false,
      favorite: false,
    },
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const aparelhoId = searchParams.get('id');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); 

  useEffect(() => {
    const loadAparelho = async () => {
      if (aparelhoId) {
        setLoading(true);
        try {
          const { data } = await api.get(`/Aparelhos/get/${aparelhoId}`);
          form.reset(data);
          setPreviewUrl(data.foto);
        } catch (err) {
          setError('Erro ao carregar o aparelho. Tente novamente.');
        } finally {
          setLoading(false);
        }
      }
    };
  
    loadAparelho();
  }, [aparelhoId, form]);

  const onSubmit = async (data: AparelhoFormValues) => {
    setLoading(true);
    setError(null); 
    setSuccess(null); 
  
    try {
      let response;
      if (aparelhoId) {
        const updatedData = { ...data, id: aparelhoId };
        response = await api.put(`/Aparelhos/${aparelhoId}`, updatedData);
        setSuccess('Aparelho atualizado com sucesso!');
        router.push('/home/Aparelhos');
      } else {
        response = await api.post('/Aparelhos/add', data);
        setSuccess('Aparelho cadastrado com sucesso!');
      }
  
      if (response.status === 200 || response.status === 201) {
        form.reset(); 
        router.push('/home/Aparelhos');
      }
    } catch (err: any) {
      if (err.response) {
        const errorMessage = typeof err.response.data === 'string'
          ? err.response.data
          : err.response.data?.title || 'Erro ao processar a requisição.';
        setError(errorMessage);
      } else if (err.request) {
        setError('Sem resposta do servidor. Verifique sua conexão de rede.');
      } else {
        setError('Erro inesperado: ' + err.message);
      }
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
              {aparelhoId ? 'Editar Aparelho' : 'Cadastro de Aparelho'}
            </h2>
            <p className="text-gray-500 mt-1">Preencha os detalhes do aparelho abaixo</p>
          </div>

          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">Nome do Aparelho</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o nome do aparelho"
                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg p-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="descricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Digite a descrição do aparelho"
                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg p-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoria"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">Categoria</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg w-full p-2"
                  >
                    <option value="">Selecione uma categoria</option>
                    {categoriasMusculos.map((categoria) => (
                      <option key={categoria.value} value={categoria.value}>
                        {categoria.label}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="foto"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">URL da Imagem do Aparelho</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite a URL da imagem do aparelho"
                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg p-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Pré-visualização da Imagem */}
          {form.watch("foto") && (
            <div className="mt-4 flex flex-col items-center">
              <p className="text-gray-600 mb-2">Pré-visualização da Imagem:</p>
              <img
                src={form.watch("foto")}
                alt="Pré-visualização"
                className="w-48 h-48 object-cover rounded-lg shadow-lg border border-gray-300"
              />
            </div>
          )}

          <FormField
            control={form.control}
            name="manutencao"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-600">Em Manutenção</FormLabel>
                <FormControl>
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                      <div className="w-10 h-4 bg-gray-300 rounded-full shadow-inner"></div>
                      <div className={`dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition ${field.value ? 'translate-x-full bg-indigo-500' : 'bg-gray-400'}`}></div>
                    </div>
                    <span className="ml-3 text-gray-500">Marque se o aparelho estiver em manutenção</span>
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
            disabled={loading}
          >
            {loading ? 'Enviando...' : aparelhoId ? 'Atualizar Aparelho' : 'Cadastrar Aparelho'}
          </Button>

          {/* Feedback de sucesso ou erro */}
          {success && <p className="text-green-600 mt-4 text-center">{success}</p>}
          {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
        </form>
      </Form>
    </div>
  );
}

