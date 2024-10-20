import React from 'react';
import { Aluno } from '../Interface/iAluno';

interface AlunoCardProps {
    aluno: Aluno;
    onClick?: () => void;
}

const AlunoCard: React.FC<AlunoCardProps> = ({ aluno, onClick }) => {
    return (
        <div 
        className="border rounded-lg p-6 shadow-lg hover:shadow-2xl cursor-pointer transition-transform transform hover:scale-105 duration-300 bg-white"
        onClick={onClick}
        >
        <div className="flex justify-center mb-4">
            <img 
            src={aluno.fotoBase64} 
            alt={`${aluno.nome} foto`} 
            className="w-28 h-28 object-cover rounded-full border-2 border-gray-300"
            />
        </div>

        <h3 className="text-2xl font-bold text-center text-gray-800 mb-2">{aluno.nome}</h3>

        <p className="text-center text-gray-600 mb-1">
            <strong>Email:</strong> {aluno.email}
        </p>
        
        <p className="text-center text-gray-600 mb-1">
            <strong>Telefone:</strong> {aluno.telefone}
        </p>

        <p className="text-center text-gray-600 mb-2">
            <strong>Tipo:</strong> {aluno.tipo}
        </p>

        <p className={`text-center font-semibold mb-2 ${aluno.ativo ? 'text-green-600' : 'text-red-600'}`}>
            {aluno.ativo ? 'Ativo' : 'Inativo'}
        </p>
        </div>

    );
}

export default AlunoCard;
