import { MigrationInterface, QueryRunner } from "typeorm";

export class New1764443733911 implements MigrationInterface {
    name = 'New1764443733911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Especialidade\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_7103a848af2acd9b508ea0eec2\` (\`nome\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Medico\` (\`id\` int NOT NULL AUTO_INCREMENT, \`crm\` varchar(255) NOT NULL, \`funcionario_id\` int NOT NULL, \`especialidade_id\` int NULL, UNIQUE INDEX \`IDX_6d9fc1f79273d7af6e5558e0ee\` (\`crm\`), UNIQUE INDEX \`REL_ce235eb7f26219a0c72705c19a\` (\`funcionario_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Funcionario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(100) NOT NULL, \`cpf\` varchar(14) NOT NULL, \`telefone\` varchar(15) NULL, \`email\` varchar(100) NOT NULL, \`cargo\` varchar(100) NOT NULL, \`data_desativacao\` date NULL, \`senha\` varchar(255) NOT NULL, \`medicoId\` int NULL, UNIQUE INDEX \`IDX_a3c63518a32475527fbdf54127\` (\`cpf\`), UNIQUE INDEX \`IDX_1f092807dc48cedc513721115d\` (\`telefone\`), UNIQUE INDEX \`IDX_0e2ca5f6f89d0a834ee47c195f\` (\`email\`), UNIQUE INDEX \`REL_2f5b5974ac47a5a479e3cdae09\` (\`medicoId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Usuario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`senha\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'ativo', \`id_cargo\` int NULL, UNIQUE INDEX \`IDX_c2591f33cb2c9e689e241dda91\` (\`email\`), UNIQUE INDEX \`REL_193af5a1a8dd74d4a80c711ac7\` (\`id_cargo\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Consulta\` (\`id\` int NOT NULL AUTO_INCREMENT, \`data\` timestamp NOT NULL, \`status\` varchar(20) NOT NULL DEFAULT 'agendada', \`motivo_consulta\` varchar(500) NULL, \`paciente_id\` int NULL, \`medico_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Paciente\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`cpf\` varchar(255) NOT NULL, \`data_nascimento\` date NULL, \`contato\` varchar(255) NOT NULL, \`endereco\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Prontuario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`evolucao_clinica\` text NULL, \`encaminhamento\` text NULL, \`conduta\` text NULL, \`agendamento_id\` int NULL, UNIQUE INDEX \`REL_e1cb1fd679b92e327e34e18d2e\` (\`agendamento_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Agenda\` (\`id\` int NOT NULL AUTO_INCREMENT, \`data\` date NOT NULL, \`hora_inicio\` time NOT NULL, \`hora_fim\` time NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'disponivel', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Medico\` ADD CONSTRAINT \`FK_ce235eb7f26219a0c72705c19a4\` FOREIGN KEY (\`funcionario_id\`) REFERENCES \`Funcionario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Medico\` ADD CONSTRAINT \`FK_8f3b328a10a37ef1fd69178e114\` FOREIGN KEY (\`especialidade_id\`) REFERENCES \`Especialidade\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` ADD CONSTRAINT \`FK_2f5b5974ac47a5a479e3cdae09a\` FOREIGN KEY (\`medicoId\`) REFERENCES \`Medico\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Usuario\` ADD CONSTRAINT \`FK_193af5a1a8dd74d4a80c711ac74\` FOREIGN KEY (\`id_cargo\`) REFERENCES \`Funcionario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` ADD CONSTRAINT \`FK_e7e6f2af59e724790fa796222da\` FOREIGN KEY (\`paciente_id\`) REFERENCES \`Paciente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` ADD CONSTRAINT \`FK_fac1f80af438460250cfe14e6db\` FOREIGN KEY (\`medico_id\`) REFERENCES \`Medico\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Prontuario\` ADD CONSTRAINT \`FK_e1cb1fd679b92e327e34e18d2ec\` FOREIGN KEY (\`agendamento_id\`) REFERENCES \`Consulta\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Prontuario\` DROP FOREIGN KEY \`FK_e1cb1fd679b92e327e34e18d2ec\``);
        await queryRunner.query(`ALTER TABLE \`Consulta\` DROP FOREIGN KEY \`FK_fac1f80af438460250cfe14e6db\``);
        await queryRunner.query(`ALTER TABLE \`Consulta\` DROP FOREIGN KEY \`FK_e7e6f2af59e724790fa796222da\``);
        await queryRunner.query(`ALTER TABLE \`Usuario\` DROP FOREIGN KEY \`FK_193af5a1a8dd74d4a80c711ac74\``);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` DROP FOREIGN KEY \`FK_2f5b5974ac47a5a479e3cdae09a\``);
        await queryRunner.query(`ALTER TABLE \`Medico\` DROP FOREIGN KEY \`FK_8f3b328a10a37ef1fd69178e114\``);
        await queryRunner.query(`ALTER TABLE \`Medico\` DROP FOREIGN KEY \`FK_ce235eb7f26219a0c72705c19a4\``);
        await queryRunner.query(`DROP TABLE \`Agenda\``);
        await queryRunner.query(`DROP INDEX \`REL_e1cb1fd679b92e327e34e18d2e\` ON \`Prontuario\``);
        await queryRunner.query(`DROP TABLE \`Prontuario\``);
        await queryRunner.query(`DROP TABLE \`Paciente\``);
        await queryRunner.query(`DROP TABLE \`Consulta\``);
        await queryRunner.query(`DROP INDEX \`REL_193af5a1a8dd74d4a80c711ac7\` ON \`Usuario\``);
        await queryRunner.query(`DROP INDEX \`IDX_c2591f33cb2c9e689e241dda91\` ON \`Usuario\``);
        await queryRunner.query(`DROP TABLE \`Usuario\``);
        await queryRunner.query(`DROP INDEX \`REL_2f5b5974ac47a5a479e3cdae09\` ON \`Funcionario\``);
        await queryRunner.query(`DROP INDEX \`IDX_0e2ca5f6f89d0a834ee47c195f\` ON \`Funcionario\``);
        await queryRunner.query(`DROP INDEX \`IDX_1f092807dc48cedc513721115d\` ON \`Funcionario\``);
        await queryRunner.query(`DROP INDEX \`IDX_a3c63518a32475527fbdf54127\` ON \`Funcionario\``);
        await queryRunner.query(`DROP TABLE \`Funcionario\``);
        await queryRunner.query(`DROP INDEX \`REL_ce235eb7f26219a0c72705c19a\` ON \`Medico\``);
        await queryRunner.query(`DROP INDEX \`IDX_6d9fc1f79273d7af6e5558e0ee\` ON \`Medico\``);
        await queryRunner.query(`DROP TABLE \`Medico\``);
        await queryRunner.query(`DROP INDEX \`IDX_7103a848af2acd9b508ea0eec2\` ON \`Especialidade\``);
        await queryRunner.query(`DROP TABLE \`Especialidade\``);
    }

}
