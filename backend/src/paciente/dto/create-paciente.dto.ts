import { IsString, IsDateString } from 'class-validator';

export class CreatePacienteDto {
  @IsString()
  nome: string;

  @IsString()
  cpf: string;

  @IsDateString()
  data_nascimento: string;

  @IsString()
  contato: string;

  @IsString()
  endereco:string;
}
