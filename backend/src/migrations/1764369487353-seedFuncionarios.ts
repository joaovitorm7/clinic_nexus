import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedFuncionarios1764369487353 implements MigrationInterface {

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
            ) VALUES (
                'Maria da Silva',
                '123.456.789-00',
                '11999999999',
                'recep@gmail.com',
                'Recepcionista',
                NULL,
                'recep123'
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM \`Funcionario\`
            WHERE cpf = '123.456.789-00';
        `);
    }
}
