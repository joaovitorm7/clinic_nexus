import { FuncionarioService } from './funcionarios.service';
export declare class FuncionariosController {
    private readonly funcionarioService;
    constructor(funcionarioService: FuncionarioService);
    create(data: {
        nome: string;
        email: string;
        telefone: string;
        cargo: string;
        senha: string;
    }): Promise<import("./entities/funcionario.entity").Funcionario>;
    findAll(): Promise<string>;
    findOne(id: string): Promise<string>;
    update(id: string, updateData: any): Promise<string>;
    remove(id: string): Promise<string>;
}
