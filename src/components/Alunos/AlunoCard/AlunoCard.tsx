import React from 'react'
import { Aluno } from '../Interface/iAluno'
import { Eye, Settings } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface AlunoCardProps {
  aluno: Aluno;
  onView: () => void;
  onManage: () => void;
}

export default function AlunoCard({ aluno, onView, onManage }: AlunoCardProps) {
  return (
    <Card className="w-full max-w-sm transition-all duration-300 hover:shadow-lg">
      <CardHeader className="flex flex-col items-center space-y-2 pb-2">
        <Avatar className="h-24 w-24">
          <AvatarImage src={aluno.fotoBase64} alt={`${aluno.nome} foto`} />
          <AvatarFallback>{aluno.nome.charAt(0)}</AvatarFallback>
        </Avatar>
        <h3 className="text-xl font-bold">{aluno.nome}</h3>
        <Badge variant={aluno.ativo ? "default" : "secondary"}>
          {aluno.ativo ? 'Ativo' : 'Inativo'}
        </Badge>
      </CardHeader>
      <CardContent className="grid gap-2 text-sm">
        <div className="grid grid-cols-3 items-center">
          <span className="font-semibold">Email:</span>
          <span className="col-span-2 truncate">{aluno.email}</span>
        </div>
        <div className="grid grid-cols-3 items-center">
          <span className="font-semibold">Telefone:</span>
          <span className="col-span-2">{aluno.telefone}</span>
        </div>
        <div className="grid grid-cols-3 items-center">
          <span className="font-semibold">Tipo:</span>
          <span className="col-span-2">{aluno.tipo}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4">
        <Button variant="outline" size="sm" onClick={onView}>
          <Eye className="mr-2 h-4 w-4" />
          Visualizar
        </Button>
        <Button variant="outline" size="sm" onClick={onManage}>
          <Settings className="mr-2 h-4 w-4" />
          Gerenciar
        </Button>
      </CardFooter>
    </Card>
  )
}