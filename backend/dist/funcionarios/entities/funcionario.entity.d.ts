import { Usuario } from '../../usuario/entities/usuario.entity';
export declare class Funcionario {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    senha: string;
    cargo: string;
    usuario: Usuario;
}
