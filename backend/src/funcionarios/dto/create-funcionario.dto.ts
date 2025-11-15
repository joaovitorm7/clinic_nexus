import { IsString, IsNotEmpty, IsEmail, IsOptional, IsEnum, IsNumber } from 'class-validator';

export enum Cargo {
  MEDICO = 'Médico',
  RECEPCIONISTA = 'Recepcionista',
  ADMINISTRADOR = 'Administrador',
}

export class CreateFuncionarioDto {
  @IsString()
  @IsNotEmpty()
  nome: string;
  
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(Cargo)
  cargo: Cargo;

  @IsString()
  @IsNotEmpty()
  senha: string;

  @IsString()
  @IsOptional()
  telefone?: string;

}
