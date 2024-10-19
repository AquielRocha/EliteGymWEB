import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Image, Settings, ChevronLeft, ChevronRight, UserPlus } from "lucide-react";
import { InscreverAlunoModal } from '@/components/Modal/InscreverAlunoModal'; // Importe o modal
import axios from 'axios';

interface AulaCardProps {
  id: number;
  nome: string;
  descricao: string;
  foto: string;
  video: string;  // Propriedade obrigatória
  tipo: string;
  data: string;
  horario: string;
  onClick: () => void;
  onManageClick: () => void; // Propriedade obrigatória
  className?: string;
}


const AulaCard: React.FC<AulaCardProps> = ({
  id,
  nome,
  descricao,
  foto,
  video,
  tipo,
  data,
  horario,
  onClick,
  onManageClick,
  className,
}) => {
  const [mediaItems, setMediaItems] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar abertura do modal

  useEffect(() => {
    const items: string[] = [];
    if (foto) items.push(foto);
    if (video) items.push(video);
    setMediaItems(items);
  }, [foto, video]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaItems.length) % mediaItems.length);
  };

  const youTubeID = video ? video.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)?.[1] : null;

  return (
    <>
      <Card
        key={id}
        className={`hover:shadow-lg transition-shadow duration-300 cursor-pointer w-80 bg-white rounded-lg overflow-hidden shadow-md ${className}`}
        onClick={onClick}
      >
        <CardHeader className="p-0 relative">
          {mediaItems.length > 0 ? (
            <div className="relative w-full h-48">
              {youTubeID ? (
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube-nocookie.com/embed/${youTubeID}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <img
                  src={mediaItems[currentIndex]}
                  alt={`Imagem da aula ${nome}`}
                  className="w-full h-full object-cover"
                />
              )}

              {mediaItems.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-1"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <Image className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
        </CardHeader>

        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold text-gray-900">{nome}</h2>
            <span className="text-sm font-medium text-gray-500">{tipo}</span>
          </div>
          <div className="mt-2 text-sm text-gray-600 h-16 overflow-y-auto">
            {descricao}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between p-4 border-t border-gray-200 bg-gray-50">
          <button
            className="flex items-center gap-2 text-indigo-600 font-semibold"
            onClick={(event) => {
              event.stopPropagation();
              onManageClick();
            }}
          >
            <Settings className="w-4 h-4" />
            Gerenciar
          </button>

          <button
            className="flex items-center gap-2 text-green-600 font-semibold"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true); // Abre o modal
            }}
          >
            <UserPlus className="w-4 h-4" />
            Inscrever Aluno
          </button>
        </CardFooter>
      </Card>

      {/* Modal de Inscrição de Aluno */}
      <InscreverAlunoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aulaId={id}
      />
    </>
  );
};

export default AulaCard;
