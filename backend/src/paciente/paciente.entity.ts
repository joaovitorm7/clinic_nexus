import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column({ type: 'date' })
  dataNascimento: string;

  @Column()
  contato: string;
}
