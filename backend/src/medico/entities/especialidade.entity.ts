import {Entity} from 'typeorm';
import {PrimaryGeneratedColumn, Column} from 'typeorm';
import {Unique} from 'typeorm';

@Entity('Especialidade')
export class Especialidade {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ unique: true })
    nome: string;
}