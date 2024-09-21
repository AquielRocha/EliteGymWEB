"use client";
import { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Calendar, CreditCard, User } from 'lucide-react';
import { useQueryGetAllAlunos } from "@/hooks/Pageinicial/useQueryGetAll";
import Loader from '@/components/Loader';

interface Aluno {
    id: string;
    nome: string;
    tipo: string;
    email: string;
    telefone: string;
    dataNascimento: string;
    statusPagamento: string;
    ativo: boolean;
}

function getInitials(name: string): string {
    const names = name.split(' ');
    const initials = names.map(n => n[0]).join('');
    return initials.toUpperCase();
}

function getStatusColor(status: string): string {
    switch (status) {
        case 'Pago':
            return 'bg-green-500'; // cor para pago
        case 'Pendente':
            return 'bg-yellow-500'; // cor para pendente
        case 'Atrasado':
            return 'bg-red-500'; // cor para atrasado
        default:
            return 'bg-gray-500'; // cor padrão
    }
}

export default function Alunos() {
                        //@ts-ignore
    const { data, error, isLoading, refetch } = useQueryGetAllAlunos<Aluno[]>();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div>
                <p>Erro ao carregar alunos.</p>
                <Button onClick={() => refetch()}>Tentar novamente</Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(data) && data.length > 0 ? (
                data.map((aluno) => (
                    <Card 
                        key={aluno.id} 
                        className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                        onClick={() => {
                            //@ts-ignore
                            setSelectedAluno(aluno);
                            setModalVisible(true);
                        }}
                    >
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Avatar className="w-12 h-12">
                                <AvatarFallback>{getInitials(aluno.nome)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h2 className="text-lg font-semibold">{aluno.nome}</h2>
                                <p className="text-sm text-muted-foreground">{aluno.tipo}</p>
                            </div>
                        </CardHeader>
                        <CardContent className="grid gap-2">
                            <div className="flex items-center">
                                <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span className="text-sm">{aluno.email}</span>
                            </div>
                            <div className="flex items-center">
                                <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span className="text-sm">{aluno.telefone}</span>
                            </div>
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                                <span className="text-sm">{new Date(aluno.dataNascimento).toLocaleDateString()}</span>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                            <Badge variant="outline" className={`${getStatusColor(aluno.statusPagamento)} text-white`}>
                                <CreditCard className="w-3 h-3 mr-1" />
                                {aluno.statusPagamento}
                            </Badge>
                            <Badge variant={aluno.ativo ? "default" : "secondary"}>
                                <User className="w-3 h-3 mr-1" />
                                {aluno.ativo ? "Ativo" : "Inativo"}
                            </Badge>
                        </CardFooter>
                    </Card>
                ))
            ) : (
                <div className="col-span-full text-center py-8">
                    <p className="text-muted-foreground">Nenhum aluno encontrado.</p>
                    <Button className="mt-4" variant="outline">Adicionar Aluno</Button>
                </div>
            )}
        </div>
    );
}
