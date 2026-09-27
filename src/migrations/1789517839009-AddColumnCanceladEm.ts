import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnCanceladEm1789517839009 implements MigrationInterface {
    name = 'AddColumnCanceladEm1789517839009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consultas" ADD "cancelada_em" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "consultas" DROP COLUMN "cancelada_em"`);
    }

}
