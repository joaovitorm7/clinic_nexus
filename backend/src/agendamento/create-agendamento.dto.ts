import { IsInt, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateAgendamentoDto {
  @IsOptional()
  @IsInt()
  id_medico?: number;

  @IsInt()
  id_paciente: number;

  @IsOptional()
  @IsString()
  especialidade?: string;

  @IsDateString()
  data: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  prontuario_path?: string;

  @IsOptional()
  @IsString()
  motivo_consulta?: string;
}
