import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMedicoDto {
  @IsNumber()
  @IsNotEmpty()
  funcionarioId: number; // ID do funcionário existente

  @IsString()
  @IsNotEmpty()
  crm: string; // CRM do médico

  @IsNumber()
  @IsNotEmpty()
  especialidadeId: number; // ID da especialidade
}
