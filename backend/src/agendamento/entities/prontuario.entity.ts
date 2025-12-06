import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Agendamento } from '../../agendamento/entities/agendamento.entity';

@Entity('Prontuario')
export class Prontuario {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Agendamento)
  @JoinColumn({ name: 'agendamento_id' })
  agendamento: Agendamento;

  @Column({ type: 'text', nullable: true })
  evolucao_clinica: string;

  @Column({ type: 'text', nullable: true })
  encaminhamento: string;

  @Column({ type: 'text', nullable: true })
  conduta: string;
}
