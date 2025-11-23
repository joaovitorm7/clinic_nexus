import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
export declare class UsuarioService {
    private readonly usuarioRepository;
    constructor(usuarioRepository: Repository<Usuario>);
    criar(usuario: Partial<Usuario>): Promise<Usuario>;
    listar(): Promise<Usuario[]>;
    findByEmail(email: string): Promise<Usuario | null>;
    buscarPorId(id: number): Promise<Usuario | null>;
    atualizar(id: number, dados: Partial<Usuario>): Promise<Usuario>;
    deletar(id: number): Promise<void>;
}
