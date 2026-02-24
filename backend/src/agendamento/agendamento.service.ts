/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Agendamento } from './entities/agendamento.entity';
import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
import { Paciente } from 'src/paciente/entities/paciente.entity';
import { Medico } from 'src/medico/entities/medico.entity';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';
import { AgendaService } from 'src/agenda/services/agenda.service';
import { StatusAgenda } from 'src/agenda/enums/status-agenda.enum';
import { Agenda } from 'src/agenda/entities/agenda.entity';
import ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';

@Injectable()
export class AgendamentoService {
  constructor(
    @InjectRepository(Agenda)
    private readonly agendaRepository: Repository<Agenda>,
    @InjectRepository(Agendamento)
    private readonly agendamentoRepository: Repository<Agendamento>,
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
    @InjectRepository(Medico)
    private readonly medicoRepository: Repository<Medico>,
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>,
    private readonly agendaService: AgendaService,
  ) {}

  async create(dto: CreateAgendamentoDto): Promise<Agendamento> {
    const agenda = await this.agendaRepository.findOne({
      where: { id: dto.id_agenda },
      relations: ['medico'],
    });

    if (!agenda) {
      throw new NotFoundException('Agenda não encontrada');
    }
    if (agenda.status === StatusAgenda.OCUPADO) {
      throw new Error('Este horário já está ocupado');
    }

    const conflitoMedico = await this.agendamentoRepository.findOne({
      where: {
        medico: { id: agenda.medico.id },
        data: new Date(agenda.data),
        hora: agenda.hora_inicio,
        status: 'agendada',
      },
    });

    if (conflitoMedico) {
      throw new BadRequestException(
        'O médico já possui um agendamento neste horário',
      );
    }

    const agendamento = this.agendamentoRepository.create({
      status: 'agendada',
      motivo_consulta: dto.motivo_consulta,
      paciente: { id: dto.id_paciente },
      medico: { id: dto.id_medico },
      agenda,
      data: agenda.data,
      hora: agenda.hora_inicio,
    });

    const consultaSalva = await this.agendamentoRepository.save(agendamento);

    // Atualiza agenda
    agenda.status = StatusAgenda.OCUPADO;
    agenda.consulta = consultaSalva;

    await this.agendaRepository.save(agenda);

    return this.agendamentoRepository.findOne({
      where: { id: consultaSalva.id },
      relations: ['paciente', 'medico', 'agenda'],
    });
  }

  findById(id: number): Promise<Agendamento> {
    return this.agendamentoRepository.findOne({
      where: { id },
      relations: [
        'paciente',
        'medico',
        'medico.especialidade',
        'medico.funcionario',
      ],
    });
  }

  async update(id: number, dto: UpdateAgendamentoDto): Promise<Agendamento> {
    const agendamento = await this.agendamentoRepository.findOne({
      where: { id },
      relations: ['paciente', 'medico', 'agenda'],
    });

    if (!agendamento) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    if (agendamento.status === 'realizada') {
      throw new BadRequestException(
        'Não é possível alterar uma consulta já realizada',
      );
    }

    const { id_paciente, id_medico, id_agenda, ...rest } = dto;

    // Atualiza paciente
    if (Object.prototype.hasOwnProperty.call(dto, 'id_paciente')) {
      const paciente = await this.pacienteRepository.findOne({
        where: { id: id_paciente },
      });
      if (!paciente) throw new NotFoundException('Paciente não encontrado');
      agendamento.paciente = paciente;
    }

    // Atualiza médico
    if (Object.prototype.hasOwnProperty.call(dto, 'id_medico')) {
      const medico = await this.medicoRepository.findOne({
        where: { id: id_medico },
      });
      if (!medico) throw new NotFoundException('Médico não encontrado');
      agendamento.medico = medico;
    }

    // Troca de agenda (horário)
    if (Object.prototype.hasOwnProperty.call(dto, 'id_agenda')) {
      const novaAgenda = await this.agendaRepository.findOne({
        where: { id: id_agenda },
        relations: ['medico'],
      });

      if (!novaAgenda) {
        throw new NotFoundException('Agenda não encontrada');
      }

      if (novaAgenda.status === StatusAgenda.OCUPADO) {
        throw new BadRequestException('Este horário já está ocupado');
      }

      // Libera agenda antiga
      if (agendamento.agenda) {
        agendamento.agenda.status = StatusAgenda.DISPONIVEL;
        agendamento.agenda.consulta = null;
        await this.agendaRepository.save(agendamento.agenda);
      }

      // Ocupa nova agenda
      novaAgenda.status = StatusAgenda.OCUPADO;
      await this.agendaRepository.save(novaAgenda);

      agendamento.agenda = novaAgenda;
      agendamento.data = new Date(novaAgenda.data);
      agendamento.hora = novaAgenda.hora_inicio;
    }

    Object.assign(agendamento, rest);

    return await this.agendamentoRepository.save(agendamento);
  }
  async updateStatus(id: number, status: string) {
    const agendamento = await this.agendamentoRepository.findOne({
      where: { id },
    });

    if (!agendamento) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    agendamento.status = status;

    return this.agendamentoRepository.save(agendamento);
  }

  async cancelAgendamento(id: number): Promise<Agendamento> {
    const agendamento = await this.agendamentoRepository.findOne({
      where: { id },
      relations: ['paciente', 'medico'],
    });

    if (!agendamento) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    // Validar se já foi realizada
    if (agendamento.status === 'realizada') {
      throw new Error('Não é possível cancelar uma consulta já realizada');
    }

    // Validar se já está cancelada
    if (agendamento.status === 'cancelada') {
      throw new Error('Esta consulta já foi cancelada');
    }

    // Atualizar status para cancelada
    agendamento.status = 'cancelada';

    if (agendamento.agenda) {
      agendamento.agenda.status = StatusAgenda.DISPONIVEL;
      agendamento.agenda.consulta = null;

      await this.agendaRepository.save(agendamento.agenda);
    }

    return await this.agendamentoRepository.save(agendamento);
  }

  async findAgendamentosByPacienteId(
    pacienteId: number,
  ): Promise<Agendamento[]> {
    return this.agendamentoRepository.find({
      where: { paciente: { id: pacienteId } },
      relations: ['paciente'],
    });
  }

  async findAll(): Promise<Agendamento[]> {
    return this.agendamentoRepository.find({
      relations: [
        'paciente',
        'medico',
        'medico.especialidade',
        'medico.funcionario',
      ],
    });
  }

  async findOne(id: number): Promise<Agendamento | null> {
    return this.agendamentoRepository.findOne({
      where: { id },
      relations: ['paciente', 'medico', 'medico.especialidade'],
    });
  }
  async findByMedico(id_medico: number) {
    return this.agendamentoRepository.find({
      where: { medico: { id: id_medico } },
      relations: ['paciente', 'medico'],
    });
  }
  async findByDate(date: Date): Promise<Agendamento[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return this.agendamentoRepository.find({
      where: {
        data: Between(startOfDay, endOfDay),
      },
      relations: ['paciente', 'medico', 'medico.especialidade'],
    });
  }
  async remove(id: number): Promise<void> {
    const agendamento = await this.agendamentoRepository.findOne({
      where: { id },
    });

    if (agendamento.agenda) {
      agendamento.agenda.status = StatusAgenda.DISPONIVEL;
    }
    await this.agendamentoRepository.delete(id);
  }
  async findByPeriodo(dataInicial: Date, dataFinal: Date) {
    const inicio = new Date(dataInicial);
    inicio.setHours(0, 0, 0, 0);

    const fim = new Date(dataFinal);
    fim.setHours(23, 59, 59, 999);

    const consultas = await this.agendamentoRepository.find({
      where: {
        data: Between(inicio, fim),
        status: 'agendada',
      },
      relations: ['paciente', 'medico', 'medico.especialidade'],
    });

    if (consultas.length === 0) {
      throw new NotFoundException('Não existem consultas no período informado');
    }

    return consultas;
  }

  async exportarExcel(dataInicial: Date, dataFinal: Date): Promise<Buffer> {
    const consultas = await this.findByPeriodo(dataInicial, dataFinal);

    const workbook: ExcelJS.Workbook = new ExcelJS.Workbook();
    const worksheet: ExcelJS.Worksheet = workbook.addWorksheet('Consultas');

    worksheet.columns = [
      { header: 'Paciente', key: 'paciente', width: 30 },
      { header: 'Médico', key: 'medico', width: 30 },
      { header: 'Especialidade', key: 'especialidade', width: 25 },
      { header: 'Data', key: 'data', width: 15 },
      { header: 'Status', key: 'status', width: 15 },
    ];

    consultas.forEach((c) => {
      worksheet.addRow({
        paciente: c.paciente?.nome ?? '',
        medico: c.medico?.funcionario?.nome ?? '',
        especialidade: c.medico?.especialidade?.nome ?? '',
        data: c.data?.toISOString().split('T')[0] ?? '',
        status: c.status ?? '',
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return Buffer.from(buffer as ArrayBuffer);
  }
  async exportarPDF(dataInicial: Date, dataFinal: Date): Promise<Buffer> {
    const consultas = await this.findByPeriodo(dataInicial, dataFinal);

    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.on('data', (chunk: Buffer) => {
      buffers.push(chunk);
    });

    doc.fontSize(16).text('Relatório de Consultas', {
      align: 'center',
    });

    doc.moveDown();

    consultas.forEach((c) => {
      doc.fontSize(12).text(`Paciente: ${c.paciente?.nome ?? ''}`);
      doc.text(`Médico: ${c.medico?.funcionario?.nome ?? ''}`);
      doc.text(`Especialidade: ${c.medico?.especialidade?.nome ?? ''}`);
      doc.text(`Data: ${c.data?.toISOString().split('T')[0] ?? ''}`);
      doc.text(`Status: ${c.status ?? ''}`);
      doc.moveDown();
    });

    doc.end();

    return new Promise((resolve) => {
      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });
    });
  }
}
