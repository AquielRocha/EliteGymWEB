import React from 'react';
import { Aluno } from '../Interface/iAluno';
import { FaEye, FaCog } from 'react-icons/fa'; // Importando ícones
import AlunoModal from '@/components/Modal/AlunoModal';

interface AlunoCardProps {
  aluno: Aluno;
  onView: () => void;
  onManage: () => void;
}

const AlunoCard: React.FC<AlunoCardProps> = ({ aluno, onView, onManage }) => {
  return (
    <div 
      className="border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer bg-white overflow-hidden"
    >
      {/* Cabeçalho com imagem */}
      <div className="p-4 flex flex-col items-center">
        <img 
          src={aluno.fotoBase64} 
          alt={`${aluno.nome} foto`} 
          className="w-24 h-24 object-cover rounded-full border-2 border-gray-300 mb-4"
        />
        <h3 className="text-xl font-bold text-gray-800">{aluno.nome}</h3>
      </div>

      {/* Conteúdo com detalhes */}
      <div className="px-6 py-4">
        <p className="text-sm text-gray-600 mb-1">
          <strong>Email:</strong> {aluno.email}
        </p>
        
        <p className="text-sm text-gray-600 mb-1">
          <strong>Telefone:</strong> {aluno.telefone}
        </p>

        <p className="text-sm text-gray-600 mb-1">
          <strong>Tipo:</strong> {aluno.tipo}
        </p>

        <p className={`text-sm font-semibold mb-4 ${aluno.ativo ? 'text-green-600' : 'text-red-600'}`}>
          {aluno.ativo ? 'Ativo' : 'Inativo'}
        </p>
      </div>

      {/* Rodapé com ícones de ação */}
      <div className="bg-gray-50 border-t border-gray-200 flex justify-between p-4">
        {/* Botão de visualizar */}
        <button 
        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold"
        onClick={() => onView()}
        >
        <FaEye className="w-4 h-4" />
        Visualizar
        </button>

        {/* Botão de gerenciar */}
        <button 
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold"
          onClick={onManage}
        >
          <FaCog className="w-4 h-4" />
          Gerenciar
        </button>
      </div>
    </div>
  );
}

export default AlunoCard;
