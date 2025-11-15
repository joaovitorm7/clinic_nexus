import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedEspecialidades1763236277844 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO Especialidade (nome) VALUES
            ('Cardiologia'),
            ('Dermatologia'),
            ('Pediatria'),
            ('Ortopedia');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM Especialidade
            WHERE nome IN ('Cardiologia','Dermatologia','Pediatria','Ortopedia');
        `);
    }
}
