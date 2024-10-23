"use client";

import { z } from "zod";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import InputMask from "react-input-mask";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useQueryGetAllPlanos } from "@/hooks/Alunos/UseQueryGetAllPlanos";
import { iPlanos } from "../Interface/iPlanos";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, IceCream, MapPin, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion'
import useMutationAddAlunos, {
  CreateAlunoComEnderecosDto,
} from "@/hooks/Alunos/Mutation/UseMutationAddAlunos";

// Validação com Zod
const alunoSchema = z.object({
  tipo: z.string().min(1, "Tipo de usuário é obrigatório"),
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(1, "Telefone é obrigatório"),
  dataNascimento: z.string().min(1, "Data de Nascimento é obrigatória"),
  planoId: z.number().min(1, "Selecione um plano"),
  objetivos: z.string().min(1, "Objetivos são obrigatórios"),
  foto: z.string().optional(),
  enderecos: z.array(
    z.object({
      rua: z.string().min(1, "Rua é obrigatória"),
      numero: z.string().min(1, "Número é obrigatório"),
      complemento: z.string().optional(),
      bairro: z.string().min(1, "Bairro é obrigatório"),
      cidade: z.string().min(1, "Cidade é obrigatória"),
      estado: z.string().min(1, "Estado é obrigatório"),
      codigoPostal: z.string().min(1, "Código Postal é obrigatório"),
      pais: z.string().min(1, "País é obrigatório"),
    })
  ),
});

type AlunoFormValues = z.infer<typeof alunoSchema>;

export default function EnhancedAlunoForm() {
  // Estado e configuração do formulário
  const form = useForm<AlunoFormValues>({
    resolver: zodResolver(alunoSchema),
    defaultValues: {
      tipo: "",
      nome: "",
      email: "",
      telefone: "",
      objetivos: "",
      dataNascimento: "",
      foto: "",
      planoId: 0,
      enderecos: [
        {
          rua: "",
          numero: "",
          complemento: "",
          bairro: "",
          cidade: "",
          estado: "",
          codigoPostal: "",
          pais: "",
        },
      ],
    },
  });

  const { control, handleSubmit, setValue, reset } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "enderecos",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [fotoBase64, setFotoBase64] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const { data: planos, isLoading, error, refetch } = useQueryGetAllPlanos();

  // Função de envio do formulário
  const onSubmit = async (data: AlunoFormValues) => {
    try {
      const dataNascimentoUTC = new Date(data.dataNascimento);
      const alunoData: CreateAlunoComEnderecosDto = {
        Nome: data.nome,
        Email: data.email,
        Foto: fotoBase64,
        Tipo: data.tipo,
        DataNascimento: dataNascimentoUTC.toISOString(),
        Telefone: data.telefone,
        Objetivos: data.objetivos,
        Ativo: true,
        PlanoId: data.planoId,
        Enderecos: data.enderecos.map((endereco) => ({
          Rua: endereco.rua,
          Numero: endereco.numero,
          Complemento: endereco.complemento || "",
          Bairro: endereco.bairro,
          Cidade: endereco.cidade,
          Estado: endereco.estado,
          CodigoPostal: endereco.codigoPostal,
          Pais: endereco.pais,
        })),
      };

      // Chama a mutação para adicionar o aluno
      const response = await useMutationAddAlunos(alunoData);
      console.log("Aluno cadastrado com sucesso:", response);

      // Reseta o formulário após sucesso
      reset();
      setFotoBase64("");

      // Redireciona para a página de alunos
      window.location.href = "/home/Alunos";
    } catch (error) {
      console.error("Erro ao cadastrar aluno:", error);
    }
  };

  // Função para upload de imagem
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFotoBase64(base64String);
        setValue("foto", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Renderização condicional durante o carregamento dos planos
  if (isLoading) {
    return <div className="text-center p-8">Carregando planos...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500 mb-4">Erro ao carregar planos.</p>
        <Button onClick={() => refetch()}>Tentar novamente</Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 max-w-4xl mx-auto p-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Cadastro de Aluno
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="personal">Informações Pessoais</TabsTrigger>
                <TabsTrigger value="plan">Plano e Objetivos</TabsTrigger>
                <TabsTrigger value="address">Endereços</TabsTrigger>
              </TabsList>

              {/* Informações Pessoais */}
              <TabsContent value="personal">
                <div className="grid gap-6">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="w-32 h-32 border-2 border-primary">
                      <AvatarImage
                        src={
                          fotoBase64 || "/placeholder.svg?height=128&width=128"
                        }
                        alt="Foto do Aluno"
                      />
                      <AvatarFallback>AL</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="picture" className="cursor-pointer">
                        <div className="flex items-center space-x-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
                          {isUploading ? (
                            <IceCream className="h-4 w-4 animate-spin" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                          <span>
                            {isUploading ? "Carregando..." : "Carregar foto"}
                          </span>
                        </div>
                        <input
                          id="picture"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="sr-only"
                        />
                      </Label>
                      {fotoBase64 && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setFotoBase64("")}
                          className="h-10 w-10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {fotoBase64 && (
                      <p className="text-sm text-muted-foreground">
                        Foto carregada com sucesso!
                      </p>
                    )}
                  </div>
                  <FormField
                    control={control}
                    name="tipo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Usuário</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo de usuário" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Aluno">Aluno</SelectItem>
                            <SelectItem value="Professor">Professor</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
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
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Digite o email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name="telefone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Controller
                              name="telefone"
                              control={control}
                              render={({ field }) => (
                                <InputMask
                                  mask="(99) 99999-9999"
                                  value={field.value}
                                  onChange={field.onChange}
                                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                  placeholder="(00) 00000-0000"
                                />
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={control}
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
                </div>
              </TabsContent>

              {/* Plano e Objetivos */}
              <TabsContent value="plan">
                <div className="space-y-6">
                  <FormField
                    control={control}
                    name="planoId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Selecione o Plano</FormLabel>
                        <Select
                          onValueChange={(value: string) =>
                            field.onChange(Number(value))
                          }
                          value={field.value.toString()}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um plano" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0" disabled>
                              Selecione um plano
                            </SelectItem>
                            {planos &&
                              planos.map((plano: iPlanos) => (
                                <SelectItem
                                  key={plano.id}
                                  value={plano.id.toString()}
                                >
                                  {`${plano.nome} - R$${plano.valor.toFixed(2)}`}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="objetivos"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Objetivos</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Digite seus objetivos"
                            {...field}
                            className="min-h-[100px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              <TabsContent value="address" className="space-y-6">
      <AnimatePresence>
        {fields.map((endereco, index) => (
          <motion.div
            key={endereco.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-muted">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  Endereço {index + 1}
                </CardTitle>
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => setEditingIndex(index === editingIndex ? null : index)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <AnimatePresence>
                  {editingIndex === index ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid gap-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={control}
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
                        <FormField
                          control={control}
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
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={control}
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
                        <FormField
                          control={control}
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
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={control}
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
                        <FormField
                          control={control}
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
                      </div>
                      <FormField
                        control={control}
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
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-sm font-medium">
                        {endereco.rua}, {endereco.numero} - {endereco.bairro}, {endereco.cidade}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {endereco.estado}, {endereco.pais}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="flex justify-between items-center mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            append({
              rua: "",
              numero: "",
              complemento: "",
              bairro: "",
              cidade: "",
              estado: "",
              codigoPostal: "",
              pais: "",
            });
            setEditingIndex(fields.length);
          }}
          className="w-full md:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" /> Adicionar Endereço
        </Button>

        <Button type="submit" className="w-full md:w-auto mt-4 md:mt-0">
          Salvar Endereços
        </Button>
      </div>
    </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Botão para enviar todo o formulário */}
        <Button type="submit" className="w-full">
          Cadastrar Aluno
        </Button>
      </form>
    </Form>
  );
}
