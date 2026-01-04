import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Funcionario } from '../../funcionarios/entities/funcionario.entity';
import { Especialidade } from './especialidade.entity';
import { Agenda } from '../../agenda/entities/agenda.entity';

@Entity('medico')
export class Medico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  crm: string;

  @ManyToOne(() => Funcionario, (funcionario) => funcionario.medico, {
    nullable: false,
  })
  @JoinColumn({ name: 'funcionario_idFuncionario' })
  funcionario: Funcionario;

  @ManyToOne(() => Especialidade, { nullable: true })
  @JoinColumn({ name: 'especialidade_id' })
  especialidade: Especialidade;

  @OneToMany(() => Agenda, (agenda) => agenda.medico)
  agendas: Agenda[];
}
