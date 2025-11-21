import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('Funcionario')
export class Funcionario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nome: string;

  @Column({ type: 'varchar', unique: true, length: 14, nullable: false })
  cpf: string; // Novo campo

  @Column({ type: 'varchar', length: 100, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 15, nullable: true, unique: true })
  telefone: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  cargo: string;

  @Column({ type: 'date', nullable: true })
  data_desativacao: Date | null;

  @OneToOne(() => Usuario, { cascade: true })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;
}
