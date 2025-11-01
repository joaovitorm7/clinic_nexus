import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('agendamentos')
export class Agendamento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    nomePaciente: string;

    @Column({ nullable: false })
    dataNascimento: string;

    @Column({ nullable: false })
    telefone: string;

    @Column({ nullable: false, unique: true })
    cpf: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    numeroCarteirinha: string;

    @Column({ nullable: false })
    especialidade: string;

    @Column({ type: 'datetime', nullable: false })
    dataConsulta: Date;

    @Column({ nullable: false })
    horaConsulta: string;
}
