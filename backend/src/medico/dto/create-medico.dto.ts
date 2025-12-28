import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
} from 'class-validator';

export class CreateMedicoDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsInt()
  @IsNotEmpty()
  funcionarioId: number;

  @IsString()
  @IsNotEmpty()
  crm: string;

  @IsInt()
  @IsNotEmpty()
  especialidadeId: number;
}
