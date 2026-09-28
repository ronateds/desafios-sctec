import { MigrationInterface, QueryRunner } from "typeorm";

/**
 * Torna o campo 'email' da tabela 'usuarios' único, evitando duplicatas.
 */

export class AddUniqueConstraintToUsuariosEmail1789686748644 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        //1. Encontrar registros duplicados no campo 'email'
        const duplicates: { email: string }[] = await queryRunner.query(`
            SELECT email
            FROM usuarios
            GROUP BY email
            HAVING COUNT(*) > 1
        `);
        
        // 2. Buscar todos os registros duplicados, do mais antigo para o mais recente
        for(const { email } of duplicates) {
            const registro: { id: string }[] = await queryRunner.query(`
                SELECT id FROM usuarios WHERE email = $1 ORDER BY "criadoEm"
                `, [email])
        

            //3. Manter o registro mais antigo com o e-mail original e renomear os demais registros
            for(let i = 1; i < registro.length; i++){
                const novoEmail = `duplicado+${registro[i].id}_${email}`
                await queryRunner.query(`
                    UPDATE usuarios SET email = $1 WHERE id = $2
                    `, [novoEmail, registro[i].id])
            }
        
        }

        //4. Executar a constraint unique
        await queryRunner.query(`ALTER TABLE usuarios ADD CONSTRAINT "UQ_usuarios_email" UNIQUE (email)`)

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE usuarios DROP CONSTRAINT "UQ_usuarios_email"`)
    }

}
