import { MigrationInterface, QueryRunner } from "typeorm";

export class New1765157650694 implements MigrationInterface {
    name = 'New1765157650694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`prontuario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`data_atendimento\` timestamp NULL, \`queixa_principal\` text NULL, \`anamnese\` text NULL, \`exames_vitais\` text NULL, \`diagnostico\` text NULL, \`evolucao_clinica\` text NULL, \`conduta\` text NULL, \`encaminhamento\` text NULL, \`medicacoes_prescritas\` text NULL, \`observacoes\` text NULL, \`agendamento_id\` int NULL, UNIQUE INDEX \`REL_d337152c26c6b65bb506fff86c\` (\`agendamento_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`Medico\` DROP FOREIGN KEY \`FK_8f3b328a10a37ef1fd69178e114\``);
        await queryRunner.query(`ALTER TABLE \`Medico\` CHANGE \`especialidade_id\` \`especialidade_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` DROP FOREIGN KEY \`FK_2f5b5974ac47a5a479e3cdae09a\``);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` CHANGE \`telefone\` \`telefone\` varchar(15) NULL`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` CHANGE \`data_desativacao\` \`data_desativacao\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` CHANGE \`medicoId\` \`medicoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`Usuario\` DROP FOREIGN KEY \`FK_193af5a1a8dd74d4a80c711ac74\``);
        await queryRunner.query(`ALTER TABLE \`Usuario\` CHANGE \`id_cargo\` \`id_cargo\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` DROP FOREIGN KEY \`FK_e7e6f2af59e724790fa796222da\``);
        await queryRunner.query(`ALTER TABLE \`Consulta\` DROP FOREIGN KEY \`FK_fac1f80af438460250cfe14e6db\``);
        await queryRunner.query(`ALTER TABLE \`Consulta\` CHANGE \`motivo_consulta\` \`motivo_consulta\` varchar(500) NULL`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` CHANGE \`paciente_id\` \`paciente_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` CHANGE \`medico_id\` \`medico_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`Paciente\` CHANGE \`data_nascimento\` \`data_nascimento\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`Paciente\` CHANGE \`endereco\` \`endereco\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`Medico\` ADD CONSTRAINT \`FK_8f3b328a10a37ef1fd69178e114\` FOREIGN KEY (\`especialidade_id\`) REFERENCES \`Especialidade\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` ADD CONSTRAINT \`FK_2f5b5974ac47a5a479e3cdae09a\` FOREIGN KEY (\`medicoId\`) REFERENCES \`Medico\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Usuario\` ADD CONSTRAINT \`FK_193af5a1a8dd74d4a80c711ac74\` FOREIGN KEY (\`id_cargo\`) REFERENCES \`Funcionario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` ADD CONSTRAINT \`FK_e7e6f2af59e724790fa796222da\` FOREIGN KEY (\`paciente_id\`) REFERENCES \`Paciente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` ADD CONSTRAINT \`FK_fac1f80af438460250cfe14e6db\` FOREIGN KEY (\`medico_id\`) REFERENCES \`Medico\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`prontuario\` ADD CONSTRAINT \`FK_d337152c26c6b65bb506fff86c3\` FOREIGN KEY (\`agendamento_id\`) REFERENCES \`Consulta\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`prontuario\` DROP FOREIGN KEY \`FK_d337152c26c6b65bb506fff86c3\``);
        await queryRunner.query(`ALTER TABLE \`Consulta\` DROP FOREIGN KEY \`FK_fac1f80af438460250cfe14e6db\``);
        await queryRunner.query(`ALTER TABLE \`Consulta\` DROP FOREIGN KEY \`FK_e7e6f2af59e724790fa796222da\``);
        await queryRunner.query(`ALTER TABLE \`Usuario\` DROP FOREIGN KEY \`FK_193af5a1a8dd74d4a80c711ac74\``);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` DROP FOREIGN KEY \`FK_2f5b5974ac47a5a479e3cdae09a\``);
        await queryRunner.query(`ALTER TABLE \`Medico\` DROP FOREIGN KEY \`FK_8f3b328a10a37ef1fd69178e114\``);
        await queryRunner.query(`ALTER TABLE \`Paciente\` CHANGE \`endereco\` \`endereco\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Paciente\` CHANGE \`data_nascimento\` \`data_nascimento\` date NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` CHANGE \`medico_id\` \`medico_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` CHANGE \`paciente_id\` \`paciente_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` CHANGE \`motivo_consulta\` \`motivo_consulta\` varchar(500) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` ADD CONSTRAINT \`FK_fac1f80af438460250cfe14e6db\` FOREIGN KEY (\`medico_id\`) REFERENCES \`Medico\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Consulta\` ADD CONSTRAINT \`FK_e7e6f2af59e724790fa796222da\` FOREIGN KEY (\`paciente_id\`) REFERENCES \`Paciente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Usuario\` CHANGE \`id_cargo\` \`id_cargo\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Usuario\` ADD CONSTRAINT \`FK_193af5a1a8dd74d4a80c711ac74\` FOREIGN KEY (\`id_cargo\`) REFERENCES \`Funcionario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` CHANGE \`medicoId\` \`medicoId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` CHANGE \`data_desativacao\` \`data_desativacao\` date NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` CHANGE \`telefone\` \`telefone\` varchar(15) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Funcionario\` ADD CONSTRAINT \`FK_2f5b5974ac47a5a479e3cdae09a\` FOREIGN KEY (\`medicoId\`) REFERENCES \`Medico\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`Medico\` CHANGE \`especialidade_id\` \`especialidade_id\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`Medico\` ADD CONSTRAINT \`FK_8f3b328a10a37ef1fd69178e114\` FOREIGN KEY (\`especialidade_id\`) REFERENCES \`Especialidade\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP INDEX \`REL_d337152c26c6b65bb506fff86c\` ON \`prontuario\``);
        await queryRunner.query(`DROP TABLE \`prontuario\``);
    }

}
