import { IsNotEmpty, IsOptional, IsInt, IsString, IsDateString } from 'class-validator';

export class CreateAgendamentoDto {
    @IsOptional() 
    @IsInt()
    id_paciente?: number;

    @IsOptional() 
    @IsInt()
    id_medico?: number;

    @IsOptional()
    @IsString()
    especialidade?: string;

    @IsNotEmpty()
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
