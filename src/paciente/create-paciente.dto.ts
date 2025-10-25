import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreatePacienteDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsDateString()  // aceita apenas string ISO 8601
  dataNascimento: string;

  @IsString()
  contato?: string;
}
