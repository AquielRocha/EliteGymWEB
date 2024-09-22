    'use client';
import AlunoForm from '@/components/Alunos/AlunoForm/AlunoForm';

export default function AddAluno() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Cadastro de Novo Aluno</h1>
      <AlunoForm />
    </div>
  )
}