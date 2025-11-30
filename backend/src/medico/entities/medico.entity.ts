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

  @Column({ unique: true })
  crm: string;

}
