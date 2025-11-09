import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
        email: string;
        senha: string;
    }): Promise<{
        usuario: Omit<import("../usuario/usuario.entity").Usuario, "senha">;
    }>;
}
