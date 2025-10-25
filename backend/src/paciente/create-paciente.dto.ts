import { IsString, IsDateString } from 'class-validator';

export class CreatePacienteDto {
  @IsString()
  nome: string;

  @IsString()
  cpf: string;

  @IsDateString()
  dataNascimento: string;

  @IsString()
  contato: string;
}
