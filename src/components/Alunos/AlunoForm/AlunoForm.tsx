'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface Endereco {
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  codigoPostal: string;
  pais: string;
}

interface Aluno {
  id: number;
  nome: string;
  email: string;
  foto: string;
  tipo: string;
  dataNascimento: string;
  telefone: string;
  objetivos: string;
  tipoPlano: string;
  statusPagamento: string;
  informacoesMedicas?: string;
  preferenciasTreino: string;
  aulas: number;
  ativo: boolean;
  enderecosJoin: Endereco[];
}

export default function AlunoForm() {
  const [aluno, setAluno] = useState<Aluno>({
    id: 0,
    nome: '',
    email: '',
    foto: '',
    tipo: '',
    dataNascimento: '',
    telefone: '',
    objetivos: '',
    tipoPlano: '',
    statusPagamento: '',
    informacoesMedicas: '',
    preferenciasTreino: '',
    aulas: 0,
    ativo: true,
    enderecosJoin: [{
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      codigoPostal: '',
      pais: ''
    }]
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setAluno(prev => ({ ...prev, [name]: value }))
  }

  const handleEnderecoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAluno(prev => ({
      ...prev,
      enderecosJoin: [{ ...prev.enderecosJoin[0], [name]: value }]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(aluno)
    // Here you would typically send the data to your backend
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Cadastro de Aluno</h2>
        <p className="text-gray-500">Preencha os dados do aluno abaixo.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome</Label>
          <Input id="nome" name="nome" value={aluno.nome} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" value={aluno.email} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="foto">URL da Foto</Label>
          <Input id="foto" name="foto" type="url" value={aluno.foto} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tipo">Tipo</Label>
          <Input id="tipo" name="tipo" value={aluno.tipo} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dataNascimento">Data de Nascimento</Label>
          <Input id="dataNascimento" name="dataNascimento" type="date" value={aluno.dataNascimento} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="telefone">Telefone</Label>
          <Input id="telefone" name="telefone" value={aluno.telefone} onChange={handleChange} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="objetivos">Objetivos</Label>
        <Textarea id="objetivos" name="objetivos" value={aluno.objetivos} onChange={handleChange} required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tipoPlano">Tipo de Plano</Label>
          <Select onValueChange={(value) => setAluno(prev => ({ ...prev, tipoPlano: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo de plano" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basico">Básico</SelectItem>
              <SelectItem value="intermediario">Intermediário</SelectItem>
              <SelectItem value="avancado">Avançado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="statusPagamento">Status de Pagamento</Label>
          <Select onValueChange={(value) => setAluno(prev => ({ ...prev, statusPagamento: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o status de pagamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pago">Pago</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="atrasado">Atrasado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="informacoesMedicas">Informações Médicas (opcional)</Label>
        <Textarea id="informacoesMedicas" name="informacoesMedicas" value={aluno.informacoesMedicas} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="preferenciasTreino">Preferências de Treino</Label>
        <Textarea id="preferenciasTreino" name="preferenciasTreino" value={aluno.preferenciasTreino} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="aulas">Número de Aulas</Label>
        <Input id="aulas" name="aulas" type="number" value={aluno.aulas} onChange={handleChange} required />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="ativo"
          checked={aluno.ativo}
          onCheckedChange={(checked) => setAluno(prev => ({ ...prev, ativo: checked }))}
        />
        <Label htmlFor="ativo">Ativo</Label>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Endereço</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="rua">Rua</Label>
            <Input id="rua" name="rua" value={aluno.enderecosJoin[0].rua} onChange={handleEnderecoChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="numero">Número</Label>
            <Input id="numero" name="numero" value={aluno.enderecosJoin[0].numero} onChange={handleEnderecoChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="complemento">Complemento</Label>
            <Input id="complemento" name="complemento" value={aluno.enderecosJoin[0].complemento} onChange={handleEnderecoChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bairro">Bairro</Label>
            <Input id="bairro" name="bairro" value={aluno.enderecosJoin[0].bairro} onChange={handleEnderecoChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cidade">Cidade</Label>
            <Input id="cidade" name="cidade" value={aluno.enderecosJoin[0].cidade} onChange={handleEnderecoChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="estado">Estado</Label>
            <Input id="estado" name="estado" value={aluno.enderecosJoin[0].estado} onChange={handleEnderecoChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="codigoPostal">Código Postal</Label>
            <Input id="codigoPostal" name="codigoPostal" value={aluno.enderecosJoin[0].codigoPostal} onChange={handleEnderecoChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pais">País</Label>
            <Input id="pais" name="pais" value={aluno.enderecosJoin[0].pais} onChange={handleEnderecoChange} required />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full">Cadastrar Aluno</Button>
    </form>
  )
}