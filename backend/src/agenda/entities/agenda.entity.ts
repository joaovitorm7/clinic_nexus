import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Medico } from '../../medico/entities/medico.entity'; 

@Entity('Agenda')
export class Agenda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  data: string;

  @Column({ type: 'time' })
  hora_inicio: string;

  @Column({ type: 'time' })
  hora_fim: string;

  @Column({ default: 'disponivel' })
  status: string;

  @ManyToOne(() => Medico, (medico) => medico.agendas, { eager: true })
  @JoinColumn({ name: 'id_medico' })
  medico: Medico;
}
