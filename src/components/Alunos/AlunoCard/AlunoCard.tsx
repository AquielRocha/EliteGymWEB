// components/Alunos/AlunoCard/AlunoCard.tsx
import React from 'react';
import { Aluno } from '../Interface/iAluno';

interface AlunoCardProps {
    aluno: Aluno;
    onClick: () => void;
}

const AlunoCard: React.FC<AlunoCardProps> = ({ aluno, onClick }) => {
    return (
        <div 
            className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer transition-shadow duration-200"
            onClick={onClick}
        >
            <img 
                src={aluno.fotoBase64} 
                alt={`${aluno.nome} foto`} 
                className="w-24 h-24 object-cover rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center">{aluno.nome}</h3>
            <p className="text-center text-gray-600">{aluno.email}</p>
            <p className="text-center text-gray-600">{aluno.telefone}</p>
            <p className="text-center text-gray-600">{aluno.tipo}</p>
            <p className="text-center text-gray-600">
                Status: {aluno.ativo ? 'Ativo' : 'Inativo'}
            </p>
            {/* Adicione mais informações conforme necessário */}
        </div>
    );
}

export default AlunoCard;
