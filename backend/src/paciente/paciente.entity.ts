import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('paciente')
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column({ type: 'date', name: 'data_nascimento' })
  dataNascimento: string;

  @Column()
  contato: string;
}
