'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import api from '@/api/axios'; // Importando sua instância de API configurada
import { useState } from 'react';

// Opções de categorias de músculos
const categoriasMusculos = [
  { label: "Braços", value: "braços" },
  { label: "Pernas", value: "pernas" },
  { label: "Costas", value: "costas" },
  { label: "Peito", value: "peito" },
  { label: "Abdômen", value: "abdômen" },
  { label: "Ombros", value: "ombros" },
];

// Schema de validação usando Zod
const aparelhoSchema = z.object({
  nome: z.string().min(2, 'O nome do aparelho deve ter pelo menos 2 caracteres'),
  descricao: z.string().optional(),
  foto: z.string().optional(), // Este campo pode armazenar a URL ou base64 da imagem
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

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: AparelhoFormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
  
    if (data.foto && data.foto.startsWith('data:image/')) {
      data.foto = data.foto.split(',')[1];
    }
  
    try {
      const response = await api.post('aparelhos/add', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 201) {
        setSuccess('Aparelho cadastrado com sucesso!');
        form.reset(); // Reseta o formulário após o sucesso
      }
    } catch (err) {
      console.error(err); // Log completo do erro
      setError('Erro ao cadastrar o aparelho. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-lg w-full bg-white p-6 rounded-lg shadow-lg">
          <div className="space-y-4 text-center">
            <h2 className="text-2xl font-bold text-gray-800">Cadastro de Aparelho</h2>
            <p className="text-gray-500">Preencha os detalhes do aparelho abaixo</p>
          </div>

          {/* Campo Nome */}
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Nome do Aparelho</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o nome do aparelho"
                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo Descrição */}
          <FormField
            control={form.control}
            name="descricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Digite a descrição do aparelho"
                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo Categoria (Select) */}
          <FormField
            control={form.control}
            name="categoria"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Categoria</FormLabel>
                <FormControl>
                  <select
                    {...field}
                    className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md w-full p-2"
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

          {/* Campo Imagem (Upload de arquivo) */}
          <FormField
            control={form.control}
            name="foto"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Imagem do Aparelho</FormLabel>
                <FormControl>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        const file = e.target.files[0];
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          field.onChange(reader.result?.toString() || '');
                        };
                        reader.readAsDataURL(file); // Converte para Base64
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          {/* Campo Manutenção (Toggle Switch) */}
          <FormField
            control={form.control}
            name="manutencao"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Em Manutenção</FormLabel>
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
                      <div className={`dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition ${field.value ? 'translate-x-full bg-indigo-600' : 'bg-gray-400'}`}></div>
                    </div>
                    <span className="ml-3 text-gray-500">Marque se o aparelho estiver em manutenção</span>
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo Favorito (Toggle Switch) */}
          <FormField
            control={form.control}
            name="favorite"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Favorito</FormLabel>
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
                      <div className={`dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition ${field.value ? 'translate-x-full bg-indigo-600' : 'bg-gray-400'}`}></div>
                    </div>
                    <span className="ml-3 text-gray-500">Marque se este for um aparelho favorito</span>
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Cadastrar Aparelho'}
          </Button>

          {/* Feedback de sucesso ou erro */}
          {success && <p className="text-green-600 mt-4">{success}</p>}
          {error && <p className="text-red-600 mt-4">{error}</p>}
        </form>
      </Form>
    </div>
  );
}
