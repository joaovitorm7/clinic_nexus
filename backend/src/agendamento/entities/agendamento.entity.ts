import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Paciente } from '../../paciente/entities/paciente.entity';
import { Medico } from '../../medico/entities/medico.entity';
import { Agenda } from 'src/agenda/entities/agenda.entity';
@Entity('consulta')
export class Agendamento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Paciente)
  @JoinColumn({ name: 'paciente_id' })
  paciente: Paciente;

  @ManyToOne(() => Medico)
  @JoinColumn({ name: 'medico_id' })
  medico: Medico;

  @OneToOne(() => Agenda, (agenda) => agenda.consulta, {
  onDelete: 'SET NULL',
  })
  agenda: Agenda;


  @Column({ type: 'timestamp', nullable: false })
  data: Date;

  @Column({ type: 'varchar', length: 20, default: 'agendada' })
  status: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  motivo_consulta: string;
}
