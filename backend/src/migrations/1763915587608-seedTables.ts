import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedTables1763915587608 implements MigrationInterface {
    name = 'SeedTables1763915587608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Funcionario\` DROP FOREIGN KEY \`FK_860c51c966d2e4ef145a1a16e16\``);
        await queryRunner.query(`DROP INDEX \`IDX_ce235eb7f26219a0c72705c19a\` ON \`Medico\``);
        await queryRunner.query(`DROP INDEX \`REL_860c51c966d2e4ef145a1a16e1\` ON \`Funcionario\``);
        await queryRunner.query(`CREATE TABLE \`agenda\` (\`id\` int NOT NULL AUTO_INCREMENT, \`data\` date NOT NULL, \`hora_inicio\` time NOT NULL, \`hora_fim\` time NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'disponivel', \`id_medico\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` DROP COLUMN \`id_usuario\``);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` ADD \`cpf\` varchar(14) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` ADD UNIQUE INDEX \`IDX_a3c63518a32475527fbdf54127\` (\`cpf\`)`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` ADD \`data_desativacao\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`Usuario\` ADD \`id_cargo\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`Usuario\` ADD UNIQUE INDEX \`IDX_193af5a1a8dd74d4a80c711ac7\` (\`id_cargo\`)`);
        await queryRunner.query(`ALTER TABLE \`Medico\` DROP FOREIGN KEY \`FK_ce235eb7f26219a0c72705c19a4\``);
        await queryRunner.query(`ALTER TABLE \`Medico\` DROP FOREIGN KEY \`FK_8f3b328a10a37ef1fd69178e114\``);
        await queryRunner.query(`ALTER TABLE \`Medico\` CHANGE \`funcionario_id\` \`funcionario_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`Medico\` CHANGE \`especialidade_id\` \`especialidade_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` CHANGE \`telefone\` \`telefone\` varchar(15) NULL`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` CHANGE \`email\` \`email\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` ADD UNIQUE INDEX \`IDX_0e2ca5f6f89d0a834ee47c195f\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` DROP COLUMN \`senha\``);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` ADD \`senha\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`Prontuario\` CHANGE \`observacoes\` \`observacoes\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`Prontuario\` CHANGE \`medicamentos_prescritos\` \`medicamentos_prescritos\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`Prontuario\` CHANGE \`procedimentos\` \`procedimentos\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`Prontuario\` DROP COLUMN \`anexos\``);
        await queryRunner.query(`ALTER TABLE \`Prontuario\` ADD \`anexos\` json NULL`);
        await queryRunner.query(`ALTER TABLE \`Paciente\` CHANGE \`data_nascimento\` \`data_nascimento\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` DROP FOREIGN KEY \`FK_57c285f00a1a22acba0d15a2248\``);
        await queryRunner.query(`ALTER TABLE \`Consulta\` CHANGE \`id_medico\` \`id_medico\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` CHANGE \`especialidade\` \`especialidade\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` CHANGE \`prontuario_path\` \`prontuario_path\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` CHANGE \`motivo_consulta\` \`motivo_consulta\` varchar(500) NULL`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` CHANGE \`id_paciente\` \`id_paciente\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_193af5a1a8dd74d4a80c711ac7\` ON \`Usuario\` (\`id_cargo\`)`);
        await queryRunner.query(`ALTER TABLE \`agenda\` ADD CONSTRAINT \`FK_d1e757a360886976a2a68be114d\` FOREIGN KEY (\`id_medico\`) REFERENCES \`Medico\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Medico\` ADD CONSTRAINT \`FK_ce235eb7f26219a0c72705c19a4\` FOREIGN KEY (\`funcionario_id\`) REFERENCES \`Funcionario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Medico\` ADD CONSTRAINT \`FK_8f3b328a10a37ef1fd69178e114\` FOREIGN KEY (\`especialidade_id\`) REFERENCES \`Especialidade\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Usuario\` ADD CONSTRAINT \`FK_193af5a1a8dd74d4a80c711ac74\` FOREIGN KEY (\`id_cargo\`) REFERENCES \`Funcionario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` ADD CONSTRAINT \`FK_57c285f00a1a22acba0d15a2248\` FOREIGN KEY (\`id_paciente\`) REFERENCES \`Paciente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Consulta\` DROP FOREIGN KEY \`FK_57c285f00a1a22acba0d15a2248\``);
        await queryRunner.query(`ALTER TABLE \`Usuario\` DROP FOREIGN KEY \`FK_193af5a1a8dd74d4a80c711ac74\``);
        await queryRunner.query(`ALTER TABLE \`Medico\` DROP FOREIGN KEY \`FK_8f3b328a10a37ef1fd69178e114\``);
        await queryRunner.query(`ALTER TABLE \`Medico\` DROP FOREIGN KEY \`FK_ce235eb7f26219a0c72705c19a4\``);
        await queryRunner.query(`ALTER TABLE \`agenda\` DROP FOREIGN KEY \`FK_d1e757a360886976a2a68be114d\``);
        await queryRunner.query(`DROP INDEX \`REL_193af5a1a8dd74d4a80c711ac7\` ON \`Usuario\``);
        await queryRunner.query(`ALTER TABLE \`Consulta\` CHANGE \`id_paciente\` \`id_paciente\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` CHANGE \`motivo_consulta\` \`motivo_consulta\` varchar(500) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` CHANGE \`prontuario_path\` \`prontuario_path\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` CHANGE \`especialidade\` \`especialidade\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` CHANGE \`id_medico\` \`id_medico\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` ADD CONSTRAINT \`FK_57c285f00a1a22acba0d15a2248\` FOREIGN KEY (\`id_paciente\`) REFERENCES \`Paciente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Paciente\` CHANGE \`data_nascimento\` \`data_nascimento\` date NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Prontuario\` DROP COLUMN \`anexos\``);
        await queryRunner.query(`ALTER TABLE \`Prontuario\` ADD \`anexos\` longtext COLLATE "utf8mb4_bin" NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Prontuario\` CHANGE \`procedimentos\` \`procedimentos\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Prontuario\` CHANGE \`medicamentos_prescritos\` \`medicamentos_prescritos\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Prontuario\` CHANGE \`observacoes\` \`observacoes\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` DROP COLUMN \`senha\``);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` ADD \`senha\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` DROP INDEX \`IDX_0e2ca5f6f89d0a834ee47c195f\``);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` CHANGE \`email\` \`email\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` CHANGE \`telefone\` \`telefone\` varchar(15) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Medico\` CHANGE \`especialidade_id\` \`especialidade_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Medico\` CHANGE \`funcionario_id\` \`funcionario_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Medico\` ADD CONSTRAINT \`FK_8f3b328a10a37ef1fd69178e114\` FOREIGN KEY (\`especialidade_id\`) REFERENCES \`Especialidade\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Medico\` ADD CONSTRAINT \`FK_ce235eb7f26219a0c72705c19a4\` FOREIGN KEY (\`funcionario_id\`) REFERENCES \`Funcionario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Usuario\` DROP INDEX \`IDX_193af5a1a8dd74d4a80c711ac7\``);
        await queryRunner.query(`ALTER TABLE \`Usuario\` DROP COLUMN \`id_cargo\``);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` DROP COLUMN \`data_desativacao\``);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` DROP INDEX \`IDX_a3c63518a32475527fbdf54127\``);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` DROP COLUMN \`cpf\``);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` ADD \`id_usuario\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`DROP TABLE \`agenda\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`REL_860c51c966d2e4ef145a1a16e1\` ON \`Funcionario\` (\`id_usuario\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_ce235eb7f26219a0c72705c19a\` ON \`Medico\` (\`funcionario_id\`)`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` ADD CONSTRAINT \`FK_860c51c966d2e4ef145a1a16e16\` FOREIGN KEY (\`id_usuario\`) REFERENCES \`Usuario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
