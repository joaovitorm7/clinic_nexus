import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProntuarioDto {
  @IsInt()
  @IsNotEmpty()
  idAgendamento: number;

  @IsOptional()
  @IsString()
  diagnostico?: string;

  @IsOptional()
  @IsString()
  observacoes?: string;

  @IsOptional()
  @IsString()
  medicamentosPrescritos?: string;

  @IsOptional()
  @IsString()
  procedimentos?: string;

  @IsOptional()
  @IsString()
  evolucaoClinica?: string;

  @IsOptional()
  @IsString()
  encaminhamento?: string;

  @IsOptional()
  @IsString()
  condutaMedica?: string;

  @IsOptional()
  anexos?: any;
}
