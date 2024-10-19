"use client"; 
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useQueryGetAllAlunos } from "@/hooks/Pageinicial/useQueryGetAll";
import Loader from '@/components/Loader';
import AlunoCard from '@/components/Alunos/AlunoCard/AlunoCard'; // Importe o AlunoCard
import { useRouter } from 'next/navigation'; 
import { Aluno } from '@/components/Alunos/Interface/iAluno';
import AddAluno from './AddAluno/page';

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
            <div className="flex justify-between items-center mb-6 ">
       
        <Button onClick={handleAddAluno} className="ml-4 bg-black text-white">
        Adicionar Aparelho
        </Button>

      </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
                {Array.isArray(data) && data.length > 0 ? (
                    data.map((aluno) => (
                        <AlunoCard 
                            key={aluno.id} 
                            aluno={aluno} 
                            onClick={() => {
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

            {/* Modal para exibir detalhes do aluno */}
            {modalVisible && selectedAluno && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-11/12 md:w-2/3 lg:w-1/2">
                        <h2 className="text-2xl font-bold mb-4">{selectedAluno.nome}</h2>
                        <img 
                            src={selectedAluno.fotoBase64} 
                            alt={`${selectedAluno.nome} foto`} 
                            className="w-32 h-32 object-cover rounded-full mb-4"
                        />
                        <p><strong>Email:</strong> {selectedAluno.email}</p>
                        <p><strong>Telefone:</strong> {selectedAluno.telefone}</p>
                        <p><strong>Data de Nascimento:</strong> {new Date(selectedAluno.dataNascimento).toLocaleDateString()}</p>
                        <p><strong>Objetivos:</strong> {selectedAluno.objetivos}</p>
                        <p><strong>Status:</strong> {selectedAluno.ativo ? 'Ativo' : 'Inativo'}</p>
                        {/* Adicione mais detalhes conforme necessário */}
                        <Button onClick={() => setModalVisible(false)} className="mt-4">
                            Fechar
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
