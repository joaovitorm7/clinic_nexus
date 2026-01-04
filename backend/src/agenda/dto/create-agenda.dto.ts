import { IsDateString, IsInt, IsString } from 'class-validator';

export class CreateAgendaDto {
  @IsInt()
  id_medico: number;

  @IsDateString()
  data: string; 

  @IsString()
  hora_inicio: string; 

  @IsString()
  hora_fim: string; 
}
