import { IsDateString, IsString } from 'class-validator';

export class UpdateAgendaDataDto {
  @IsDateString()
  data: string;

  @IsString()
  hora_inicio: string;

  @IsString()
  hora_fim: string;
}
