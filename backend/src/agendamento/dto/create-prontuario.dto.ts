import { IsNotEmpty, IsOptional, IsString, IsDateString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProntuarioDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  agendamentoId: number;

  @IsOptional()
  @IsDateString()
  data_atendimento?: string;

  @IsOptional()
  @IsString()
  queixa_principal?: string;

  @IsOptional()
  @IsString()
  anamnese?: string;

  @IsOptional()
  @IsString()
  exames_vitais?: string;

  @IsOptional()
  @IsString()
  diagnostico?: string;

  @IsOptional()
  @IsString()
  evolucao_clinica?: string;

  @IsOptional()
  @IsString()
  conduta?: string;

  @IsOptional()
  @IsString()
  encaminhamento?: string;

  @IsOptional()
  @IsString()
  medicacoes_prescritas?: string;

  @IsOptional()
  @IsString()
  observacoes?: string;
}
