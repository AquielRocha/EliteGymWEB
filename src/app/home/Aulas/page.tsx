'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useQueryGetAllAulas } from "@/hooks/Pageinicial/useQueryGetAllAulas"; // Hook para buscar aulas
import Loader from '@/components/Loader';
import AulaCard from '@/components/Aulas/AulaCard/AulaCard';  // Componente de card para aulas
import AulaModal from '@/components/Modal/AulaModal'; // Modal para gerenciamento de aulas
import { useRouter } from 'next/navigation';
import api from '@/api/axios';  // Certifique-se de importar a API corretamente

// Atualizando a interface Aula para incluir o campo `video`
interface Aula {
  id: number;
  nome: string;
  descricao: string;
  foto: string;
  video: string;  // Incluindo o campo `video`
  tipo: string;
  data: string;
  horario: string;
  numeroVagas: number;
}

const tiposDeAula = [
  { label: "Todos", value: "" },
  { label: "Online", value: "online" },
  { label: "Presencial", value: "presencial" },
  { label: "Gravado", value: "gravado" },
];

export default function Aulas() {
  const router = useRouter();
  const { data, error, isLoading, refetch } = useQueryGetAllAulas();  // Hook para pegar todas as aulas

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
    router.push('/Aulas/AddAula');
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
        <Button 
          className={`${tipoFiltro === 'todos' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`} 
          onClick={() => setTipoFiltro('todos')}
        >
          Todos
        </Button>

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
              id={aula.id}
              nome={aula.nome}
              descricao={aula.descricao}
              foto={aula.foto}
              video={aula.video}  // Adicionando o campo `video`
              tipo={aula.tipo}
              data={aula.data}
              horario={aula.horario}
              onClick={() => {
                setSelectedAula(aula);
                setModalVisible(true);
              }}
              onManageClick={() => {
                console.log(`Gerenciar aula ${aula.nome}`); // Exemplo de função para gerenciar a aula
              }}
            />
          ))          
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">Nenhuma aula encontrada.</p>
          </div>
        )}
      </div>

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
