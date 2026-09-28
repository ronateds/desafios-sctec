import { MigrationInterface, QueryRunner, TableColumn, TableIndex } from "typeorm";

export class AddTelefoneEmailIndex1789685154853 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("usuarios", new TableColumn({
            name: "telefone",
            type: "varchar",
            isNullable: true,
        }))

        await queryRunner.createIndex("usuarios", new TableIndex({
            name: "IDX_USUARIOS_EMAIL",
            columnNames: ["email"],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex("usuarios", "IDX_USUARIOS_EMAIL")
        await queryRunner.dropColumn("usuarios", "telefone")
    }

}
