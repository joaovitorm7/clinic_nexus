import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateAllTables1763233072201 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
