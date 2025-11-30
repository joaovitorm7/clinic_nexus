import { UsuarioService } from './usuario.service';
import { Usuario } from './entities/usuario.entity';
export declare class UsuarioController {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
    findAll(): Promise<Usuario[]>;
    create(usuario: Partial<Usuario>): Promise<Usuario>;
    buscarPorId(id: string): Promise<Usuario>;
}
