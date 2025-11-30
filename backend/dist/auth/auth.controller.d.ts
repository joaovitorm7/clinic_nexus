import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
        email: string;
        senha: string;
    }): Promise<{
        usuario: Omit<import("../funcionarios/entities/funcionario.entity").Funcionario, "senha">;
    }>;
}
