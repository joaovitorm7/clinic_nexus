import { Especialidade } from "./entities/especialidade.entity";
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEspecialidadeDto } from './dto/create-especialidade.dto';


@Injectable()
export class EspecialidadeService {
  constructor(
    @InjectRepository(Especialidade)
    private readonly especialidadeRepository: Repository<Especialidade>,
  ) {}


async create(createEspecialidadeDto: CreateEspecialidadeDto) {
  const exists = await this.especialidadeRepository.findOne({
    where: { nome: createEspecialidadeDto.nome },
  });

  if (exists) {
    throw new ConflictException(`Especialidade '${createEspecialidadeDto.nome}' já existe`);
  }

  const especialidade = this.especialidadeRepository.create(createEspecialidadeDto);
  return this.especialidadeRepository.save(especialidade);
}


  findAll() {
    return this.especialidadeRepository.find();
  }

  async findOne(id: number) {
    const especialidade =  await this.especialidadeRepository.findOne({ where: { id } }); 

    if (!especialidade) {
      throw new NotFoundException(`Especialidade com id ${id} não encontrada`);
    }

    return especialidade;
  }
}