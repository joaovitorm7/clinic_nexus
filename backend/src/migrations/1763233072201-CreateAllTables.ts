import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAllTables1763233072201 implements MigrationInterface {
    name = 'CreateAllTables1763233072201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Funcionario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`telefone\` varchar(15) NULL, \`cargo\` varchar(100) NOT NULL, \`id_usuario\` int NULL, UNIQUE INDEX \`IDX_0e2ca5f6f89d0a834ee47c195f\` (\`email\`), UNIQUE INDEX \`IDX_1f092807dc48cedc513721115d\` (\`telefone\`), UNIQUE INDEX \`REL_860c51c966d2e4ef145a1a16e1\` (\`id_usuario\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Usuario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`senha\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'ativo', \`id_cargo\` int NULL, UNIQUE INDEX \`IDX_c2591f33cb2c9e689e241dda91\` (\`email\`), UNIQUE INDEX \`REL_193af5a1a8dd74d4a80c711ac7\` (\`id_cargo\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Prontuario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`data_registro\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`diagnostico\` text NOT NULL, \`observacoes\` text NULL, \`medicamentos_prescritos\` text NULL, \`procedimentos\` text NULL, \`anexos\` json NULL, \`criado_em\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`atualizado_em\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Paciente\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`cpf\` varchar(255) NOT NULL, \`data_nascimento\` date NULL, \`contato\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Especialidade\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_7103a848af2acd9b508ea0eec2\` (\`nome\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Medico\` (\`id\` int NOT NULL AUTO_INCREMENT, \`crm\` varchar(255) NOT NULL, \`funcionario_id\` int NULL, \`especialidade_id\` int NULL, UNIQUE INDEX \`IDX_6d9fc1f79273d7af6e5558e0ee\` (\`crm\`), UNIQUE INDEX \`REL_ce235eb7f26219a0c72705c19a\` (\`funcionario_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Consulta\` (\`id\` int NOT NULL AUTO_INCREMENT, \`id_medico\` int NULL, \`especialidade\` varchar(100) NULL, \`data\` timestamp NOT NULL, \`status\` varchar(20) NOT NULL DEFAULT 'agendada', \`prontuario_path\` varchar(255) NULL, \`motivo_consulta\` varchar(500) NULL, \`id_paciente\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` ADD CONSTRAINT \`FK_860c51c966d2e4ef145a1a16e16\` FOREIGN KEY (\`id_usuario\`) REFERENCES \`Usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Usuario\` ADD CONSTRAINT \`FK_193af5a1a8dd74d4a80c711ac74\` FOREIGN KEY (\`id_cargo\`) REFERENCES \`Funcionario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Medico\` ADD CONSTRAINT \`FK_ce235eb7f26219a0c72705c19a4\` FOREIGN KEY (\`funcionario_id\`) REFERENCES \`Funcionario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Medico\` ADD CONSTRAINT \`FK_8f3b328a10a37ef1fd69178e114\` FOREIGN KEY (\`especialidade_id\`) REFERENCES \`Especialidade\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` ADD CONSTRAINT \`FK_57c285f00a1a22acba0d15a2248\` FOREIGN KEY (\`id_paciente\`) REFERENCES \`Paciente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Consulta\` DROP FOREIGN KEY \`FK_57c285f00a1a22acba0d15a2248\``);
        await queryRunner.query(`ALTER TABLE \`Medico\` DROP FOREIGN KEY \`FK_8f3b328a10a37ef1fd69178e114\``);
        await queryRunner.query(`ALTER TABLE \`Medico\` DROP FOREIGN KEY \`FK_ce235eb7f26219a0c72705c19a4\``);
        await queryRunner.query(`ALTER TABLE \`Usuario\` DROP FOREIGN KEY \`FK_193af5a1a8dd74d4a80c711ac74\``);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` DROP FOREIGN KEY \`FK_860c51c966d2e4ef145a1a16e16\``);
        await queryRunner.query(`DROP TABLE \`Consulta\``);
        await queryRunner.query(`DROP INDEX \`REL_ce235eb7f26219a0c72705c19a\` ON \`Medico\``);
        await queryRunner.query(`DROP INDEX \`IDX_6d9fc1f79273d7af6e5558e0ee\` ON \`Medico\``);
        await queryRunner.query(`DROP TABLE \`Medico\``);
        await queryRunner.query(`DROP INDEX \`IDX_7103a848af2acd9b508ea0eec2\` ON \`Especialidade\``);
        await queryRunner.query(`DROP TABLE \`Especialidade\``);
        await queryRunner.query(`DROP TABLE \`Paciente\``);
        await queryRunner.query(`DROP TABLE \`Prontuario\``);
        await queryRunner.query(`DROP INDEX \`REL_193af5a1a8dd74d4a80c711ac7\` ON \`Usuario\``);
        await queryRunner.query(`DROP INDEX \`IDX_c2591f33cb2c9e689e241dda91\` ON \`Usuario\``);
        await queryRunner.query(`DROP TABLE \`Usuario\``);
        await queryRunner.query(`DROP INDEX \`REL_860c51c966d2e4ef145a1a16e1\` ON \`Funcionario\``);
        await queryRunner.query(`DROP INDEX \`IDX_1f092807dc48cedc513721115d\` ON \`Funcionario\``);
        await queryRunner.query(`DROP INDEX \`IDX_0e2ca5f6f89d0a834ee47c195f\` ON \`Funcionario\``);
        await queryRunner.query(`DROP TABLE \`Funcionario\``);
    }

}
