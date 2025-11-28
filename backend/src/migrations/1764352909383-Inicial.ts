import { MigrationInterface, QueryRunner } from "typeorm";

export class Inicial1764352909383 implements MigrationInterface {
    name = 'Inicial1764352909383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Agenda\` (\`id\` int NOT NULL AUTO_INCREMENT, \`data\` date NOT NULL, \`hora_inicio\` time NOT NULL, \`hora_fim\` time NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'disponivel', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Medico\` DROP FOREIGN KEY \`FK_8f3b328a10a37ef1fd69178e114\``);
        await queryRunner.query(`ALTER TABLE \`Medico\` CHANGE \`especialidade_id\` \`especialidade_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` DROP FOREIGN KEY \`FK_2f5b5974ac47a5a479e3cdae09a\``);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` CHANGE \`telefone\` \`telefone\` varchar(15) NULL`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` CHANGE \`data_desativacao\` \`data_desativacao\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` CHANGE \`medicoId\` \`medicoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`Usuario\` DROP FOREIGN KEY \`FK_193af5a1a8dd74d4a80c711ac74\``);
        await queryRunner.query(`ALTER TABLE \`Usuario\` CHANGE \`id_cargo\` \`id_cargo\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` DROP FOREIGN KEY \`FK_57c285f00a1a22acba0d15a2248\``);
        await queryRunner.query(`ALTER TABLE \`Consulta\` CHANGE \`id_medico\` \`id_medico\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` CHANGE \`especialidade\` \`especialidade\` varchar(100) NULL`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` CHANGE \`prontuario_path\` \`prontuario_path\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` CHANGE \`motivo_consulta\` \`motivo_consulta\` varchar(500) NULL`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` CHANGE \`id_paciente\` \`id_paciente\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`Paciente\` CHANGE \`data_nascimento\` \`data_nascimento\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`Paciente\` CHANGE \`endereco\` \`endereco\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`Medico\` ADD CONSTRAINT \`FK_8f3b328a10a37ef1fd69178e114\` FOREIGN KEY (\`especialidade_id\`) REFERENCES \`Especialidade\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` ADD CONSTRAINT \`FK_2f5b5974ac47a5a479e3cdae09a\` FOREIGN KEY (\`medicoId\`) REFERENCES \`Medico\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Usuario\` ADD CONSTRAINT \`FK_193af5a1a8dd74d4a80c711ac74\` FOREIGN KEY (\`id_cargo\`) REFERENCES \`Funcionario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` ADD CONSTRAINT \`FK_57c285f00a1a22acba0d15a2248\` FOREIGN KEY (\`id_paciente\`) REFERENCES \`Paciente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Consulta\` DROP FOREIGN KEY \`FK_57c285f00a1a22acba0d15a2248\``);
        await queryRunner.query(`ALTER TABLE \`Usuario\` DROP FOREIGN KEY \`FK_193af5a1a8dd74d4a80c711ac74\``);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` DROP FOREIGN KEY \`FK_2f5b5974ac47a5a479e3cdae09a\``);
        await queryRunner.query(`ALTER TABLE \`Medico\` DROP FOREIGN KEY \`FK_8f3b328a10a37ef1fd69178e114\``);
        await queryRunner.query(`ALTER TABLE \`Paciente\` CHANGE \`endereco\` \`endereco\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Paciente\` CHANGE \`data_nascimento\` \`data_nascimento\` date NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` CHANGE \`id_paciente\` \`id_paciente\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` CHANGE \`motivo_consulta\` \`motivo_consulta\` varchar(500) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` CHANGE \`prontuario_path\` \`prontuario_path\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` CHANGE \`especialidade\` \`especialidade\` varchar(100) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` CHANGE \`id_medico\` \`id_medico\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` ADD CONSTRAINT \`FK_57c285f00a1a22acba0d15a2248\` FOREIGN KEY (\`id_paciente\`) REFERENCES \`Paciente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Usuario\` CHANGE \`id_cargo\` \`id_cargo\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Usuario\` ADD CONSTRAINT \`FK_193af5a1a8dd74d4a80c711ac74\` FOREIGN KEY (\`id_cargo\`) REFERENCES \`Funcionario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` CHANGE \`medicoId\` \`medicoId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` CHANGE \`data_desativacao\` \`data_desativacao\` date NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` CHANGE \`telefone\` \`telefone\` varchar(15) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` ADD CONSTRAINT \`FK_2f5b5974ac47a5a479e3cdae09a\` FOREIGN KEY (\`medicoId\`) REFERENCES \`Medico\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Medico\` CHANGE \`especialidade_id\` \`especialidade_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Medico\` ADD CONSTRAINT \`FK_8f3b328a10a37ef1fd69178e114\` FOREIGN KEY (\`especialidade_id\`) REFERENCES \`Especialidade\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE \`Agenda\``);
    }

}
