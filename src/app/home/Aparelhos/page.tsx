'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useQueryGetAllAparelhos } from "@/hooks/Pageinicial/useQueryGetAllAparelhos";
import Loader from '@/components/Loader';
import AparelhoCard from '@/components/Aparelhos/AparelhoCard/AparelhoCard'; 
import AparelhoModal from '@/components/Modal/AparelhoModal';
import { useRouter } from 'next/navigation'; 
import { FaTools, FaHeart, FaDumbbell } from 'react-icons/fa';
import api from '@/api/axios';

interface Aparelho {
  id: number;
  nome: string;
  descricao: string;
  foto: string;
  categoria: string; 
  manutencao: boolean;
  favorite: boolean;
}

const categoriasTreino = [
  { label: "Todos", value: "" },
  { label: "Braços", value: "braços" },
  { label: "Pernas", value: "pernas" },
  { label: "Costas", value: "costas" },
  { label: "Peito", value: "peito" },
  { label: "Abdômen", value: "abdômen" },
  { label: "Ombros", value: "ombros" },
];

export default function Aparelhos() {
  const router = useRouter();
  const { data, error, isLoading, refetch } = useQueryGetAllAparelhos();
  
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const [filterType, setFilterType] = useState<string>('todos'); 
  const [categoriaTreino, setCategoriaTreino] = useState<string>(''); 
  const [filteredAparelhos, setFilteredAparelhos] = useState<Aparelho[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false); 
  const [selectedAparelho, setSelectedAparelho] = useState<Aparelho | null>(null);

  useEffect(() => {
    if (data) {
      const filtered = data.filter((aparelho: Aparelho) => {
        const matchesSearch = aparelho.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              aparelho.categoria.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesFilter = 
          filterType === 'todos' || 
          (filterType === 'manutencao' && aparelho.manutencao) || 
          (filterType === 'favoritos' && aparelho.favorite);

        const matchesCategoriaTreino = 
          categoriaTreino === '' || aparelho.categoria === categoriaTreino;

        return matchesSearch && matchesFilter && matchesCategoriaTreino;
      });

      setFilteredAparelhos(filtered);
    }
  }, [data, searchTerm, filterType, categoriaTreino]);

  const handleAddAparelho = (aparelhoId?: number) => {
    if (aparelhoId) {
      // Redireciona para edit
      router.push(`/home/Aparelhos/AddAparelho?id=${aparelhoId}`);
    } else {
      router.push('/home/Aparelhos/AddAparelho');
    }
  };
  

  const handleDeleteAparelho = async () => {
    if (!selectedAparelho) return;

    try {
      await api.delete(`/aparelhos/delete/${selectedAparelho.id}`);
      refetch();
      setModalVisible(false);
    } catch (error) {
      console.error('Erro ao excluir o aparelho:', error);
    }
  };

  const handleToggleManutencao = async () => {
    if (!selectedAparelho) return;
  
    try {
      const updatedAparelho = { ...selectedAparelho, manutencao: !selectedAparelho.manutencao };
  
      await api.put(`/aparelhos/${selectedAparelho.id}`, updatedAparelho);
  
      refetch(); 
      setModalVisible(false);
    } catch (error) {
      console.error('Erro ao atualizar o estado de manutenção do aparelho:', error);
    }
  };
  

  const handleToggleFavorite = async (aparelho: Aparelho) => {
    try {
      const updatedAparelho = { ...aparelho, favorite: !aparelho.favorite };
      await api.put(`/aparelhos/${aparelho.id}`, updatedAparelho);
      refetch(); 
    } catch (error) {
      console.error('Erro ao atualizar o estado de favorito do aparelho:', error);
    }
  };
  

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center">
        <p>Erro ao carregar aparelhos.</p>
        <Button onClick={() => refetch()}>Tentar novamente</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Buscar aparelhos..."
          className="border border-gray-300 rounded-md p-2 w-full max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={() => handleAddAparelho()} className="ml-4 bg-black text-white">
        Adicionar Aparelho
        </Button>

      </div>

      <div className="flex justify-center space-x-4 mb-6">
        <Button 
          className={`${filterType === 'todos' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`} 
          onClick={() => setFilterType('todos')}
        >
          <FaDumbbell className="mr-2" /> Todos
        </Button>

        <Button 
          className={`${filterType === 'manutencao' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`} 
          onClick={() => setFilterType('manutencao')}
        >
          <FaTools className="mr-2" /> Em Manutenção
        </Button>

        <Button 
          className={`${filterType === 'favoritos' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`} 
          onClick={() => setFilterType('favoritos')}
        >
          <FaHeart className="mr-2" /> Favoritos
        </Button>

        <select
          className="border border-blue-500 bg-white text-blue-500 rounded-md p-2 transition duration-300 ease-in-out hover:shadow-lg"
          value={categoriaTreino}
          onChange={(e) => setCategoriaTreino(e.target.value)}
        >
          {categoriasTreino.map((categoria) => (
            <option key={categoria.value} value={categoria.value}>
              {categoria.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {Array.isArray(filteredAparelhos) && filteredAparelhos.length > 0 ? (
          filteredAparelhos.map((aparelho: Aparelho, index: number) => (
            <AparelhoCard
              key={aparelho.id}
              id={aparelho.id}
              nome={aparelho.nome}
              descricao={aparelho.descricao}
              foto={aparelho.foto}
              categoria={aparelho.categoria}
              manutencao={aparelho.manutencao}
              favorite={aparelho.favorite}
              onClick={() => {
                setSelectedAparelho(aparelho);
                setModalVisible(true);
              }}
              onToggleFavorite={() => handleToggleFavorite(aparelho)}
              onManageClick={() => {
                setSelectedAparelho(aparelho);
                setModalVisible(true);
              }}
              className={`opacity-0 transform scale-95 transition-opacity duration-500 delay-${index * 100} animate-fade-in`}
            />
          
          ))          
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">Nenhum aparelho encontrado.</p>
          </div>
        )}
      </div>

      {modalVisible && selectedAparelho && (
        <AparelhoModal
            aparelho={selectedAparelho}
            onClose={() => setModalVisible(false)}
            onDelete={handleDeleteAparelho}
            onToggleManutencao={handleToggleManutencao}
        />
        )}
    </div>
  );
}
