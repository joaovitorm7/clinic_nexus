import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Funcionario } from '../../funcionarios/entities/funcionario.entity';
import { Especialidade } from './especialidade.entity';
import { Agendamento } from '../../agendamento/entities/agendamento.entity';
import { Agenda } from 'src/agenda/entities/agenda.entity';
@Entity('Medico')
export class Medico {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Funcionario, { nullable: false })
  @JoinColumn({ name: 'funcionario_id' })
  funcionario: Funcionario;

  @ManyToOne(() => Especialidade, { nullable: true })
  @JoinColumn({ name: 'especialidade_id' })
  especialidade: Especialidade;

  @OneToMany(() => Agenda, (agenda) => agenda.medico)
  agendas: Agenda[];

  @Column({ unique: true })
  crm: string;
}
