import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Paciente } from '../../paciente/entities/paciente.entity';
import { Medico } from '../../medico/entities/medico.entity';

@Entity('Consulta')
export class Agendamento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Paciente)
  @JoinColumn({ name: 'paciente_id' })
  paciente: Paciente;

  @ManyToOne(() => Medico)
  @JoinColumn({ name: 'medico_id' })
  medico: Medico;

  @Column({ type: 'timestamp', nullable: false })
  data: Date;

  @Column({ type: 'varchar', length: 20, default: 'agendada' })
  status: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  motivo_consulta: string;
}
