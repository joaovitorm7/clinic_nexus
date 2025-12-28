import { Controller, Get } from '@nestjs/common';
import { EspecialidadeService } from './especialidade.service';

@Controller('especialidades')
export class EspecialidadeController {
  constructor(
    private readonly especialidadeService: EspecialidadeService,
  ) {}

  @Get()
  findAll() {
    return this.especialidadeService.findAll();
  }
}
