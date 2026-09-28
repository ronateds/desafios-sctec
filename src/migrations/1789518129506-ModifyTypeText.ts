import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyTypeText1789518129506 implements MigrationInterface {
    name = 'ModifyTypeText1789518129506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consultas" ALTER COLUMN "observacoes" TYPE text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consultas" ALTER COLUMN "observacoes" TYPE character varying(255)`);
    }

}
