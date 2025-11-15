import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Paciente')
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  cpf: string;

@Column({ type: 'date', nullable: true })
data_nascimento: Date;


  @Column()
  contato: string;
}
