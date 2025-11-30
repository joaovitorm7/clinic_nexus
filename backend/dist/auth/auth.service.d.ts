import { Repository } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
export declare class AuthService {
    private readonly usuarioRepository;
    constructor(usuarioRepository: Repository<Usuario>);
    validarUsuario(email: string, senha: string): Promise<Omit<Usuario, 'senha'> | null>;
    login(email: string, senha: string): Promise<{
        usuario: Omit<Usuario, "senha">;
    }>;
}
