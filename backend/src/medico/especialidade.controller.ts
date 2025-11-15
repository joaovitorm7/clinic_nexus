import { Especialidade } from "./entities/especialidade.entity";
import { Controller, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEspecialidadeDto } from '../medico/dto/create-especialidade.dto';
import { Body, Post, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EspecialidadeService } from './especialidade.service';
@Controller('especialidades')
export class EspecialidadeController {
  constructor(
    private readonly especialidadeService: EspecialidadeService,
  ) {}
  
  @Post()
  create(@Body() dto: CreateEspecialidadeDto) {
    return this.especialidadeService.create(dto);
  }
    @Get()
    findAll() {
        return this.especialidadeService.findAll();
    }
    
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.especialidadeService.findOne(id);
    }
}