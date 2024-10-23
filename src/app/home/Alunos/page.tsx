"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Aluno } from '@/components/Alunos/Interface/iAluno'
import { useQueryGetAllAlunos } from "@/hooks/Pageinicial/useQueryGetAll"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Mail, Phone, MapPin, CreditCard, CheckCircle, XCircle, Clock } from 'lucide-react'
import AlunoCard from '@/components/Alunos/AlunoCard/AlunoCard'



export default function Alunos() {
  const router = useRouter()
  const { data, error, isLoading } = useQueryGetAllAlunos()
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [tipoUsuario, setTipoUsuario] = useState('')
  const [filteredAlunos, setFilteredAlunos] = useState<Aluno[]>([])

  useEffect(() => {
    if (data) {
      const filtered = data.filter((aluno: Aluno) => {
        const matchesSearch = aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesTipo = tipoUsuario === "" || aluno.tipo === tipoUsuario
        return matchesSearch && matchesTipo
      })
      setFilteredAlunos(filtered)
    }
  }, [data, searchTerm, tipoUsuario])

  if (isLoading) return <Loader2 className="h-8 w-8 animate-spin" />
  if (error) return <div className="text-center mt-6 text-red-600">Erro ao carregar alunos.</div>

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Lista de Alunos e Professores</h1>
        <Button onClick={() => router.push('Alunos/AddAluno')}>
          Adicionar Usuário
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Buscar por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={tipoUsuario} onValueChange={setTipoUsuario}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o tipo" />
          </SelectTrigger>
          <SelectContent>
      <SelectItem value="aluno">Alunos</SelectItem>
      <SelectItem value="professor">Professores</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlunos.length ? (
          filteredAlunos.map((aluno: Aluno) => (
            <AlunoCard
              key={aluno.id}
              aluno={aluno}
              onView={() => {
                setSelectedAluno(aluno)
                setModalVisible(true)
              }}
              onManage={() => console.log('Gerenciar aluno', aluno)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            Nenhum usuário encontrado.
          </div>
        )}
      </div>

      <Dialog open={modalVisible} onOpenChange={setModalVisible}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedAluno?.nome}</DialogTitle>
            <DialogDescription>Detalhes do usuário</DialogDescription>
          </DialogHeader>
          {selectedAluno && (
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">Informações</TabsTrigger>
                <TabsTrigger value="addresses">Endereços</TabsTrigger>
                <TabsTrigger value="payments">Mensalidades</TabsTrigger>
              </TabsList>
              <TabsContent value="info">
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={selectedAluno.fotoBase64} alt={selectedAluno.nome} />
                      <AvatarFallback>{selectedAluno.nome.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{selectedAluno.nome}</CardTitle>
                      <Badge variant={selectedAluno.ativo ? "default" : "secondary"}>
                        {selectedAluno.ativo ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{selectedAluno.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{selectedAluno.telefone}</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="addresses">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Endereços
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedAluno.enderecos.length ? (
                      selectedAluno.enderecos.map((endereco, index) => (
                        <div key={index} className="mb-4 text-sm">
                          <p>{endereco.rua}, {endereco.numero}</p>
                          {endereco.complemento && <p>Complemento: {endereco.complemento}</p>}
                          <p>{endereco.bairro}, {endereco.cidade} - {endereco.estado}</p>
                          <p>{endereco.codigoPostal}, {endereco.pais}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground">Nenhum endereço registrado.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="payments">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Mensalidades
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {selectedAluno.mensalidades.length ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Plano</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Vencimento</TableHead>
                            <TableHead>Pagamento</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedAluno.mensalidades.map((mensalidade, index) => (
                            <TableRow key={index}>
                              <TableCell>{typeof mensalidade.plano === 'string' ? mensalidade.plano : 'N/A'}</TableCell>
                              <TableCell>R$ {mensalidade.valorMensalidade.toFixed(2)}</TableCell>
                              <TableCell>{new Date(mensalidade.dataVencimento).toLocaleDateString()}</TableCell>
                              <TableCell>
                                {mensalidade.dataPagamento
                                  ? new Date(mensalidade.dataPagamento).toLocaleDateString()
                                  : 'Pendente'}
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  variant={mensalidade.status === 'Pago' ? 'default' : mensalidade.status === 'Atrasado' ? 'destructive' : 'secondary'}
                                  className="flex w-fit items-center gap-1"
                                >
                                  {mensalidade.status === 'Pago' ? <CheckCircle className="h-3 w-3" /> :
                                   mensalidade.status === 'Atrasado' ? <XCircle className="h-3 w-3" /> :
                                   <Clock className="h-3 w-3" />}
                                  {mensalidade.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <p className="text-muted-foreground">Nenhuma mensalidade registrada.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}