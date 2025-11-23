import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Medico } from '../../medico/entities/medico.entity';

@Entity('Funcionario')
export class Funcionario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 14, unique: true, nullable: false })
  cpf: string;

  @Column({ type: 'varchar', length: 15, nullable: true, unique: true })
  telefone: string;
    
  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  cargo: string;

  @Column({ type: 'date', nullable: true })
  data_desativacao: Date | null;

  @Column({ type: 'varchar', length: 255, nullable: false })
  senha: string;

  @OneToOne(() => Medico, medico => medico.funcionario, { nullable: true })
  @JoinColumn()
  medico?: Medico;
}
