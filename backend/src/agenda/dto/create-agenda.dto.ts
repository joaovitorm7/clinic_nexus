import { 
IsNotEmpty,
IsOptional,
IsString,
IsNumber
} from 'class-validator';
export class CreateAgendaDto {
  @IsNumber()
  @IsNotEmpty()
  id_medico: number;

  @IsString()
  @IsNotEmpty()
  data: string;

  @IsString()
  @IsNotEmpty()
  hora_inicio: string;

  @IsString()
  @IsNotEmpty()
  hora_fim: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsNotEmpty()
  @IsOptional()
  test?: string;
}
