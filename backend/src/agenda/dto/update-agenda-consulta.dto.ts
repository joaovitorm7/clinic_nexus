import { IsOptional, IsEnum, IsInt, IsDateString, Matches } from 'class-validator';
import { StatusAgenda } from '../enums/status-agenda.enum';

export class UpdateAgendaDto {
  @IsOptional()
  @IsEnum(StatusAgenda)
  status?: StatusAgenda;

  @IsOptional()
  @IsInt()
  id_consulta?: number;

  @IsOptional()
  @IsDateString()
  data?: string;

  @IsOptional()
  @Matches(/^\d{2}:\d{2}$/)
  hora_inicio?: string;

  @IsOptional()
  @Matches(/^\d{2}:\d{2}$/)
  hora_fim?: string;
}
