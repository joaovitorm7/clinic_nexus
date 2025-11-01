import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateAgendamentoDto {
    @IsNotEmpty()
    @IsString()
    nomePaciente: string;

    @IsNotEmpty()
    dataNascimento: string;

    @IsNotEmpty()
    telefone: string;

    @IsNotEmpty()
    cpf: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    numeroCarteirinha: string;

    @IsNotEmpty()
    especialidade: string;

    @IsNotEmpty()
    dataConsulta: Date;

    @IsNotEmpty()
    horaConsulta: string;
}
