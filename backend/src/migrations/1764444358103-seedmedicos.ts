import { MigrationInterface, QueryRunner } from "typeorm";

export class Seedmedicos1764444358103 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO \`Funcionario\`
                (\`nome\`, \`cpf\`, \`telefone\`, \`email\`, \`cargo\`, \`data_desativacao\`, \`senha\`)
            VALUES
                ('Dr. House',  '00000000001', '(11) 99999-0001', 'house@clinic.com',  'medico', NULL, 'senha123'),
                ('Dr. Who', '00000000002', '(11) 99999-0002', 'who@clinic.com', 'medico', NULL, 'senha123'),
                ('Dra. Meredith Gey ',   '00000000003', '(11) 99999-0003', 'gey@clinic.com',   'medico', NULL, 'senha123'),
                ('Dr. Shaum Murphy',   '00000000004', '(11) 99999-0004', 'shaum@clinic.com',    'medico', NULL, 'senha123');
        `);

        await queryRunner.query(`
            INSERT INTO \`Medico\` (\`crm\`, \`funcionario_id\`, \`especialidade_id\`)
            VALUES
                ('CRM-1001', (SELECT id FROM \`Funcionario\` WHERE \`cpf\` = '00000000001' LIMIT 1), 1),
                ('CRM-1002', (SELECT id FROM \`Funcionario\` WHERE \`cpf\` = '00000000002' LIMIT 1), 2),
                ('CRM-1003', (SELECT id FROM \`Funcionario\` WHERE \`cpf\` = '00000000003' LIMIT 1), 3),
                ('CRM-1004', (SELECT id FROM \`Funcionario\` WHERE \`cpf\` = '00000000004' LIMIT 1), 4);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM \`Medico\`
            WHERE \`crm\` IN ('CRM-1001','CRM-1002','CRM-1003','CRM-1004');
        `);

        await queryRunner.query(`
            DELETE FROM \`Funcionario\`
            WHERE \`cpf\` IN ('00000000001','00000000002','00000000003','00000000004');
        `);
    }

}
