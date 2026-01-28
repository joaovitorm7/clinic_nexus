import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  OneToOne,
} from 'typeorm';
import { Medico } from '../../medico/entities/medico.entity';
import { StatusAgenda } from '../enums/status-agenda.enum';
import { Agendamento } from '../../agendamento/entities/agendamento.entity';
@Entity('agenda')
@Unique(['medico', 'data', 'hora_inicio'])
export class Agenda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  data: string;

  @Column({ type: 'time' })
  hora_inicio: string;

  @Column({ type: 'time' })
  hora_fim: string;

  @Column({
    type: 'enum',
    enum: StatusAgenda,
    default: StatusAgenda.DISPONIVEL,
  })
  status: StatusAgenda;

  @ManyToOne(() => Medico, (medico) => medico.agendas, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_medico' })
  medico: Medico;
  
 
 
  @OneToOne(() => Agendamento, (agendamento) => agendamento.agenda)
  consulta: Agendamento;



}
