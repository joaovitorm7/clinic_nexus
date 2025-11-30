import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedUsuarios1764444421022 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO \`Funcionario\` (
                nome,
                cpf,
                telefone,
                email,
                cargo,
                data_desativacao,
                senha
            ) VALUES
            (
                'Maria da Silva',
                '123.456.789-00',
                '11999999999',
                'recep@gmail.com',
                'Recepcionista',
                NULL,
                'recep123'
            ),
            (
                'Administrador do Sistema',
                '000.000.000-00',
                '11988888888',
                'admin@clinic.com',
                'Administrador',
                NULL,
                'admin123'
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM \`Funcionario\`
            WHERE cpf IN ('123.456.789-00', '000.000.000-00');
        `);
    }
}
