import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Paciente')
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ type: 'date' })
  dataNascimento: string;

  @Column()
  contato: string;
}
