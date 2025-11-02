import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Consulta')
export class Agendamento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: true })
    id_paciente: number;

    @Column({ type: 'int', nullable: true })
    id_medico: number;

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
