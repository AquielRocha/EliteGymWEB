    'use client';
    import AlunoForm from '@/components/Alunos/AlunoForm/AlunoForm';

    export default function AddAluno() {
      return (
        <div className="container mx-auto py-10">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6">Cadastro Usuário</h1>
            <AlunoForm />
          </div>
        </div>
      )
    }