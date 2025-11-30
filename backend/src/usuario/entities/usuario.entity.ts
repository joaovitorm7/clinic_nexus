import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Funcionario } from '../../funcionarios/entities/funcionario.entity';
@Entity('Usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Funcionario)   // relação 1:1
  @JoinColumn({ name: 'id_cargo' }) // cria a coluna id_cargo no banco
  funcionario: Funcionario;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column({ default: 'ativo' })
  status: string;
}
