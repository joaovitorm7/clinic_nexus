import { IsOptional, IsString, IsEmail, IsInt } from 'class-validator';

export class UpdateFuncionarioDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsString()
  cargo?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  crm?: string;

  @IsOptional()
  @IsInt()
  especialidadeId?: number;
}
