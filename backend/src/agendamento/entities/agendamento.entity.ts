import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Paciente } from '../../paciente/entities/paciente.entity'; 

@Entity('Consulta')
export class Agendamento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: true })
    id_medico: number;

    @ManyToOne(() => Paciente)
    @JoinColumn({ name: 'id_paciente' })
    paciente: Paciente;

    @Column({ type: 'varchar', length: 100, nullable: true })
    especialidade: string;

    @Column({ type: 'timestamp', nullable: false })
    data: Date;

    @Column({ type: 'varchar', length: 20, default: 'agendada' })
    status: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    prontuario_path: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    motivo_consulta: string;
}
