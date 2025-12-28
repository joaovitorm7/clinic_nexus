import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsEmail,
  IsInt,
} from 'class-validator';

export enum Cargo {
  MEDICO = 'Médico',
  RECEPCIONISTA = 'Recepcionista',
  ADMINISTRADOR = 'Administrador',
}

export class CreateFuncionarioDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEnum(Cargo)
  cargo: Cargo;

  @IsString()
  @IsNotEmpty()
  cpf: string;

  @IsString()
  @IsOptional()
  telefone?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  senha: string;

  @IsString()
  @IsOptional()
  crm?: string;

  @IsInt()
  @IsOptional()
  especialidadeId?: number;
}
