import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicoDto } from './create-medico.dto';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdateMedicoDto extends PartialType(CreateMedicoDto) {
  @IsOptional()
  @IsString()
  crm?: string;

  @IsOptional()
  @IsNumber()
  especialidadeId?: number;
}
