import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Medico } from '../../medico/entities/medico.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity('funcionario')
export class Funcionario {
  @PrimaryGeneratedColumn({ name: 'idFuncionario' })
  id: number;

  @Column({ type: 'varchar', length: 45, nullable: true })
  cpf: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  nome: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  telefone: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  cargo: string;

  @Column({ type: 'datetime', name: 'data_desativacao', nullable: true })
  data_desativacao: Date | null;

  @OneToOne(() => Medico, (medico) => medico.funcionario)
  medico: Medico;

  @OneToMany(() => Usuario, (usuario) => usuario.funcionario)
  usuarios: Usuario[];
}
