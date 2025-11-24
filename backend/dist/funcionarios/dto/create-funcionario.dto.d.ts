export declare enum Cargo {
    MEDICO = "M\u00E9dico",
    RECEPCIONISTA = "Recepcionista",
    ADMINISTRADOR = "Administrador"
}
export declare class CreateFuncionarioDto {
    nome: string;
    email: string;
    cargo: Cargo;
    senha: string;
    telefone?: string;
}
