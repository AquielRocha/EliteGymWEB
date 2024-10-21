"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useQueryGetAllAulas } from "@/hooks/Pageinicial/useQueryGetAllAulas";
import Loader from '@/components/Loader';
import AulaCard from '@/components/Aulas/AulaCard/AulaCard';
import AulaModal from '@/components/Modal/AulaModal';
import { useRouter } from 'next/navigation';
import api from '@/api/axios';
import { Aluno } from '@/components/Alunos/Interface/iAluno';

interface Aula {
  id: number;
  nome: string;
  descricao: string;
  foto: string;
  video?: string;
  tipo: string;
  data: string;
  horario: string;
  numeroVagas: number;
  alunosInscritos?: Aluno[];
}

const tiposDeAula = [
  { label: "Todos", value: "todos" },
  { label: "Online", value: "online" },
  { label: "Presencial", value: "presencial" },
  { label: "Gravado", value: "gravado" },
];

export default function Aulas() {
  const router = useRouter();
  const { data, error, isLoading, refetch } = useQueryGetAllAulas();

  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const [tipoFiltro, setTipoFiltro] = useState<string>('todos');
  const [filteredAulas, setFilteredAulas] = useState<Aula[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedAula, setSelectedAula] = useState<Aula | null>(null);

  // Filtro e busca nas aulas
  useEffect(() => {
    if (data) {
      const filtered = data.filter((aula: Aula) => {
        const matchesSearch = aula.nome.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTipo = tipoFiltro === 'todos' || aula.tipo.toLowerCase() === tipoFiltro.toLowerCase();
        return matchesSearch && matchesTipo;
      });

      setFilteredAulas(filtered);
    }
  }, [data, searchTerm, tipoFiltro]);

  // Adicionar nova aula
  const handleAddAula = () => {
    router.push('/home/Aulas/AddAula');
  };

  // Excluir aula
  const handleDeleteAula = async () => {
    if (!selectedAula) return;

    try {
      await api.delete(`/aulas/del/${selectedAula.id}`);
      refetch();  // Recarrega a lista de aulas após exclusão
      setModalVisible(false);  // Fecha o modal
    } catch (error) {
      console.error('Erro ao excluir a aula:', error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center">
        <p>Erro ao carregar aulas.</p>
        <Button onClick={() => refetch()}>Tentar novamente</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Buscar aulas..."
          className="border border-gray-300 rounded-md p-2 w-full max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleAddAula} className="ml-4 bg-black text-white">
          Adicionar Aula
        </Button>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        {/* Filtros de tipo de aula */}
        {tiposDeAula.map((tipo) => (
          <Button 
            key={tipo.value}
            className={`${tipoFiltro === tipo.value ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`} 
            onClick={() => setTipoFiltro(tipo.value)}
          >
            {tipo.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {Array.isArray(filteredAulas) && filteredAulas.length > 0 ? (
          filteredAulas.map((aula: Aula) => (
            <AulaCard
              key={aula.id}
              aula={aula}
              onClick={() => {
                setSelectedAula(aula);
                setModalVisible(true);
              }}
              onManageClick={() => {
                setSelectedAula(aula);
                setModalVisible(true);
              }}
            />
          ))          
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">Nenhuma aula encontrada.</p>
          </div>
        )}
      </div>

      {/* Modal de gerenciamento da aula */}
      {modalVisible && selectedAula && (
        <AulaModal
          aula={selectedAula}
          onClose={() => setModalVisible(false)}
          onDelete={handleDeleteAula}
        />
      )}
    </div>
  );
}