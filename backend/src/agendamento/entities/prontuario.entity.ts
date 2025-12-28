import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn} from 'typeorm';
import { Agendamento } from '../../agendamento/entities/agendamento.entity';

@Entity('prontuario')
export class Prontuario {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => Agendamento)
  @JoinColumn({ name: 'agendamento_id' })
  agendamento: Agendamento;

  @Column({ type: 'timestamp', name: 'data_atendimento', nullable: true })
  data_atendimento: Date | null;

  @Column({ type: 'text', name: 'queixa_principal', nullable: true })
  queixa_principal: string | null;

  @Column({ type: 'text', name: 'anamnese', nullable: true })
  anamnese: string | null;

  @Column({ type: 'text', name: 'exames_vitais', nullable: true })
  exames_vitais: string | null;

  @Column({ type: 'text', name: 'diagnostico', nullable: true })
  diagnostico: string | null;

  @Column({ type: 'text', name: 'evolucao_clinica', nullable: true })
  evolucao_clinica: string | null;

  @Column({ type: 'text', name: 'conduta', nullable: true })
  conduta: string | null;

  @Column({ type: 'text', name: 'encaminhamento', nullable: true })
  encaminhamento: string | null;

  @Column({ type: 'text', name: 'medicacoes_prescritas', nullable: true })
  medicacoes_prescritas: string | null;

  @Column({ type: 'text', name: 'observacoes', nullable: true })
  observacoes: string | null;
}
