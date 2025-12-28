import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Especialidade } from './entities/especialidade.entity';

@Injectable()
export class EspecialidadeService {
  constructor(
    @InjectRepository(Especialidade)
    private readonly especialidadeRepo: Repository<Especialidade>,
  ) {}

  async create(nome: string): Promise<Especialidade> {
    const existe = await this.especialidadeRepo.findOne({
      where: { nome },
    });

    if (existe) {
      throw new BadRequestException('Especialidade já cadastrada');
    }

    const especialidade = this.especialidadeRepo.create({ nome });
    return this.especialidadeRepo.save(especialidade);
  }

  async findAll(): Promise<Especialidade[]> {
    return this.especialidadeRepo.find({
      order: { nome: 'ASC' },
    });
  }

  async findById(id: number): Promise<Especialidade> {
    const especialidade = await this.especialidadeRepo.findOne({
      where: { id },
    });

    if (!especialidade) {
      throw new NotFoundException('Especialidade não encontrada');
    }

    return especialidade;
  }

  async findByNome(nome: string): Promise<Especialidade[]> {
    return this.especialidadeRepo.find({
      where: { nome: ILike(`%${nome}%`) },
      order: { nome: 'ASC' },
    });
  }

  async update(id: number, nome: string): Promise<Especialidade> {
    const especialidade = await this.findById(id);

    const existe = await this.especialidadeRepo.findOne({
      where: { nome },
    });

    if (existe && existe.id !== id) {
      throw new BadRequestException('Já existe outra especialidade com este nome');
    }

    especialidade.nome = nome;
    return this.especialidadeRepo.save(especialidade);
  }

  async remove(id: number): Promise<void> {
    const especialidade = await this.findById(id);
    await this.especialidadeRepo.remove(especialidade);
  }
}
