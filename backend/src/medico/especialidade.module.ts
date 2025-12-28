import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especialidade } from './entities/especialidade.entity';
import { EspecialidadeService } from './especialidade.service';
import { EspecialidadeController } from './especialidade.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Especialidade]),
  ],
  controllers: [EspecialidadeController],
  providers: [EspecialidadeService],
  exports: [EspecialidadeService],
})
export class EspecialidadeModule {}
