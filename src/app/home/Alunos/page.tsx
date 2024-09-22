"use client";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useQueryGetAllAlunos } from "@/hooks/Pageinicial/useQueryGetAll";
import Loader from '@/components/Loader';
import AlunoCard from '@/components/Alunos/AlunoCard/AlunoCard'; // Importe o AlunoCard
import { useRouter } from 'next/navigation'; 

interface Aluno {
    id: string;
    foto: string;
    nome: string;
    tipo: string;
    email: string;
    telefone: string;
    dataNascimento: string;
    statusPagamento: string;
    ativo: boolean;
}

export default function Alunos() {
    const router = useRouter();
    const { data, error, isLoading, refetch } = useQueryGetAllAlunos();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);

    const handleAddAluno = () => {
        router.push('Alunos/AddAluno');
    }

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
        <div>
            {/* Botão de adicionar aluno fixo ou posicionado no layout */}
            <div className="fixed top-4 right-4">
    <Button onClick={handleAddAluno} className="mt-4 bg-black text-white">Adicionar Aluno</Button>
</div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((aluno) => (
                        //@ts-ignore
                        <AlunoCard 
                        key={aluno.id} 
                        {...aluno} 
                        onClick={() => {
                            //@ts-ignore
                            setSelectedAluno(aluno);
                                setModalVisible(true);
                            }}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-8">
                        <p className="text-muted-foreground">Nenhum aluno encontrado.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
