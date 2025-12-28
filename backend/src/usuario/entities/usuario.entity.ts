import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Funcionario } from '../../funcionarios/entities/funcionario.entity';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ type: 'varchar', length: 45, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  senha: string;

  @ManyToOne(() => Funcionario, (funcionario) => funcionario.usuarios, {
  nullable: true,
  })
  @JoinColumn({ name: 'funcionario_id' })
  funcionario: Funcionario;
}
