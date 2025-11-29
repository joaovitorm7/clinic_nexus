import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProntuarioDto {
  @IsNumber()
  @IsNotEmpty()
  agendamentoId: number;

  @IsString()
  @IsOptional()
  evolucao_clinica?: string;

  @IsString()
  @IsOptional()
  encaminhamento?: string;

  @IsString()
  @IsOptional()
  conduta?: string;
}
