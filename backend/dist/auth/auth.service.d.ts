import { Repository } from 'typeorm';
import { Funcionario } from '../funcionarios/entities/funcionario.entity';
export declare class AuthService {
    private readonly funcionarioRepository;
    constructor(funcionarioRepository: Repository<Funcionario>);
    validarUsuario(email: string, senha: string): Promise<Omit<Funcionario, 'senha'> | null>;
    login(email: string, senha: string): Promise<{
        usuario: Omit<Funcionario, "senha">;
    }>;
}
