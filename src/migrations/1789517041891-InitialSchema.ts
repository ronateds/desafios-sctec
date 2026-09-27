import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1789517041891 implements MigrationInterface {
    name = 'InitialSchema1789517041891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."usuarios_role_enum" AS ENUM('PACIENTE', 'MEDICO', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "usuarios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "role" "public"."usuarios_role_enum" NOT NULL DEFAULT 'PACIENTE', "criadoEm" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "medicos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "crm" character varying NOT NULL, "especialidade" character varying NOT NULL, "usuario_id" uuid, CONSTRAINT "UQ_c957799fdfd60f35a89f48ef7eb" UNIQUE ("crm"), CONSTRAINT "REL_ced065017c1ddddcd50c7718b1" UNIQUE ("usuario_id"), CONSTRAINT "PK_f16d578e9fd6df731d5e8551725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."consultas_status_enum" AS ENUM('AGENDADA', 'REALIZADA', 'CANCELADA')`);
        await queryRunner.query(`CREATE TABLE "consultas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "data_hora" TIMESTAMP NOT NULL, "status" "public"."consultas_status_enum" NOT NULL DEFAULT 'AGENDADA', "observacoes" character varying, "criado_em" TIMESTAMP NOT NULL DEFAULT now(), "paciente_id" uuid, "medico_id" uuid, CONSTRAINT "PK_889a9011f1854a60a6aae1c6d80" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pacientes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "data_nascimento" date, "usuario_id" uuid, CONSTRAINT "REL_3065e2172ba8e5572489cceac7" UNIQUE ("usuario_id"), CONSTRAINT "PK_aa9c9f624ff22fc06c44d8b1609" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "medicos" ADD CONSTRAINT "FK_ced065017c1ddddcd50c7718b12" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consultas" ADD CONSTRAINT "FK_6831bdfd0989bcfe51895fe9d38" FOREIGN KEY ("paciente_id") REFERENCES "pacientes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "consultas" ADD CONSTRAINT "FK_c5997b73e47ed12e19f094ff073" FOREIGN KEY ("medico_id") REFERENCES "medicos"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pacientes" ADD CONSTRAINT "FK_3065e2172ba8e5572489cceac74" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pacientes" DROP CONSTRAINT "FK_3065e2172ba8e5572489cceac74"`);
        await queryRunner.query(`ALTER TABLE "consultas" DROP CONSTRAINT "FK_c5997b73e47ed12e19f094ff073"`);
        await queryRunner.query(`ALTER TABLE "consultas" DROP CONSTRAINT "FK_6831bdfd0989bcfe51895fe9d38"`);
        await queryRunner.query(`ALTER TABLE "medicos" DROP CONSTRAINT "FK_ced065017c1ddddcd50c7718b12"`);
        await queryRunner.query(`DROP TABLE "pacientes"`);
        await queryRunner.query(`DROP TABLE "consultas"`);
        await queryRunner.query(`DROP TYPE "public"."consultas_status_enum"`);
        await queryRunner.query(`DROP TABLE "medicos"`);
        await queryRunner.query(`DROP TABLE "usuarios"`);
        await queryRunner.query(`DROP TYPE "public"."usuarios_role_enum"`);
    }

}
