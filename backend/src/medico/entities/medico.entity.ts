import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Funcionario } from '../../funcionarios/entities/funcionario.entity';
import { Especialidade } from './especialidade.entity';

@Entity('Medico')
export class Medico {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Funcionario)
  @JoinColumn({ name: 'funcionario_id' }) 
  funcionario: Funcionario;

  @ManyToOne(() => Especialidade)
  @JoinColumn({ name: 'especialidade_id' })
  especialidade: Especialidade;

  @Column({ unique: true })
  crm: string;
}
