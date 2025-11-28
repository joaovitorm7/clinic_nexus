import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Agendamento } from '../../agendamento/entities/agendamento.entity';

@Entity('Paciente')
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column({ type: 'date', nullable: true })
  data_nascimento: Date;

  @Column()
  contato: string;

  @Column({ nullable: true })
  endereco: string;

  @OneToMany(() => Agendamento, (agendamento) => agendamento.paciente)
  agendamentos: Agendamento[];

}
