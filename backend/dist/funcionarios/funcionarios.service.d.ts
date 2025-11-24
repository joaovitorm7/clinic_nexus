import { Repository } from 'typeorm';
import { Funcionario } from './entities/funcionario.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
export declare class FuncionarioService {
    private readonly funcionarioRepo;
    private readonly usuarioRepo;
    constructor(funcionarioRepo: Repository<Funcionario>, usuarioRepo: Repository<Usuario>);
    createFuncionario(data: {
        nome: string;
        email: string;
        telefone: string;
        cargo: string;
        senha: string;
    }): Promise<Funcionario>;
}
