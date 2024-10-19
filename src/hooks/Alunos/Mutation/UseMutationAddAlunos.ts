import axios from 'axios';



interface CreateAlunoComEnderecosDto {
    Nome: string;
    Email: string;
    Foto: string;
    Tipo: string;
    DataNascimento: Date;
    Telefone: string;
    Objetivos: string;
    Ativo: boolean;
    PlanoId: number;
    Enderecos?: EnderecoDto[];
}

interface EnderecoDto {
    Rua: string;
    Numero: string;
    Complemento: string;
    Bairro: string;
    Cidade: string;
    Estado: string;
    CodigoPostal: string;
    Pais: string;
}

async function useMutationAddAlunos(createAlunoComEnderecosDto: CreateAlunoComEnderecosDto) {
    try {
        const response = await axios.post('/api/alunos/add', createAlunoComEnderecosDto);
        return response.data;
    } catch (error) {
        throw new Error((error as any).response.data);
    }
}

export default useMutationAddAlunos;