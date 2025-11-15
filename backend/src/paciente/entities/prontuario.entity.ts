import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Paciente } from '../../paciente/entities/paciente.entity';
import { Medico } from '../../medico/entities/medico.entity';

@Entity('Prontuario')
export class Prontuario {
  @PrimaryGeneratedColumn()
  id: number;
  // Para próxima Sprint
  //@ManyToOne(() => Paciente, (paciente) => paciente.prontuarios, { nullable: false })
  //@JoinColumn({ name: 'id_paciente' })
  paciente: Paciente;
  // Para próxima Sprint
  //@ManyToOne(() => Medico, (medico) => medico.prontuarios, { nullable: false })
  // @JoinColumn({ name: 'id_medico' })
  //medico: Medico;

  @CreateDateColumn({ name: 'data_registro' })
  dataRegistro: Date;

  @Column({ type: 'text' })
  diagnostico: string;

  @Column({ type: 'text', nullable: true })
  observacoes?: string;

  @Column({ type: 'text', nullable: true, name: 'medicamentos_prescritos' })
  medicamentosPrescritos?: string;

  @Column({ type: 'text', nullable: true })
  procedimentos?: string;

  @Column({ type: 'json', nullable: true })
  anexos?: any;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
