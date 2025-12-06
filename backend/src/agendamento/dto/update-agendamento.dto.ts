import { PartialType } from '@nestjs/mapped-types';
import { CreateAgendamentoDto } from './create-agendamento.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAgendamentoDto extends PartialType(CreateAgendamentoDto) {
  @IsOptional()
  @IsString()
  status?: string;
}
