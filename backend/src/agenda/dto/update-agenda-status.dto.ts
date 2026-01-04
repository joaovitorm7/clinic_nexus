import { IsEnum } from 'class-validator';
import { StatusAgenda } from '../enums/status-agenda.enum';

export class UpdateAgendaStatusDto {
  @IsEnum(StatusAgenda)
  status: StatusAgenda;
}
