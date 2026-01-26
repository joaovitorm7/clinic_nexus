import { IsInt, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateAgendamentoDto {
  @IsInt()
  id_medico?: number;

  @IsInt()
  id_paciente: number;

  @IsInt()
  id_agenda: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  motivo_consulta?: string;
}
