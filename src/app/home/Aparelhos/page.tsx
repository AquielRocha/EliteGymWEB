"use client";
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useQueryGetAllAparelhos } from "@/hooks/Pageinicial/useQueryGetAllAparelhos";
import Loader from '@/components/Loader';
import AparelhoCard from '@/components/Aparelhos/AparelhoCard/AparelhoCard'; 
import { useRouter } from 'next/navigation'; 

interface Aparelho {
    id: number;
    nome: string;
    descricao: string;
    foto: string;
    categoria: string;
    manutencao: boolean;
    favorite: boolean;
}

export default function Aparelhos() {
    const router = useRouter();
    const { data, error, isLoading, refetch } = useQueryGetAllAparelhos();
    
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterType, setFilterType] = useState<string>('todos'); // Estado do filtro
    const [filteredAparelhos, setFilteredAparelhos] = useState<Aparelho[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false); // Controla visibilidade do modal
    const [selectedAparelho, setSelectedAparelho] = useState<Aparelho | null>(null); // Aparelho selecionado

    useEffect(() => {
        if (data) {
            // Filtra os aparelhos com base no termo de busca e no tipo de filtro
            const filtered = data.filter((aparelho: Aparelho) => {
                const matchesSearch = aparelho.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                      aparelho.categoria.toLowerCase().includes(searchTerm.toLowerCase());

                // Filtro por tipo
                const matchesFilter = 
                    filterType === 'todos' || 
                    (filterType === 'manutencao' && aparelho.manutencao) || 
                    (filterType === 'favoritos' && aparelho.favorite);
                
                return matchesSearch && matchesFilter;
            });
            setFilteredAparelhos(filtered);
        }
    }, [data, searchTerm, filterType]);

    const handleAddAparelho = () => {
        router.push('Aparelhos/AddAparelho');
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
            {/* Campo de busca e botões de filtro */}
            <div className="flex justify-between items-center mb-6">
                <input
                    type="text"
                    placeholder="Buscar aparelhos..."
                    className="border border-gray-300 rounded-md p-2 w-full max-w-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={handleAddAparelho} className="ml-4 bg-black text-white">
                    Adicionar Aparelho
                </Button>
            </div>

            {/* Filtros por tipo */}
            <div className="flex justify-center space-x-4 mb-6">
                <Button 
                    className={`${filterType === 'todos' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`} 
                    onClick={() => setFilterType('todos')}
                >
                    Todos
                </Button>
                <Button 
                    className={`${filterType === 'manutencao' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`} 
                    onClick={() => setFilterType('manutencao')}
                >
                    Em Manutenção
                </Button>
                <Button 
                    className={`${filterType === 'favoritos' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'}`} 
                    onClick={() => setFilterType('favoritos')}
                >
                    Favoritos
                </Button>
            </div>

            {/* Grid de aparelhos */}
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
                                setSelectedAparelho(aparelho); // Atualiza o aparelho selecionado
                                setModalVisible(true); // Abre o modal
                            }}
                            className={`opacity-0 transform scale-95 transition-opacity duration-500 delay-${index * 100} animate-fade-in`}  // Aplicação da classe de animação
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-8">
                        <p className="text-muted-foreground">Nenhum aparelho encontrado.</p>
                    </div>
                )}
            </div>

            {/* Exemplo de Modal (opcional) */}
            {modalVisible && selectedAparelho && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-md">
                        <h2>{selectedAparelho.nome}</h2>
                        <p>{selectedAparelho.descricao}</p>
                        <Button onClick={() => setModalVisible(false)}>Fechar</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
