import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column({ default: 'ativo' })
  status: string;

  @Column()
  tipo: string;

}
