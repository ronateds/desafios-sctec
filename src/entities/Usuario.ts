import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Index
} from 'typeorm'

//Enum para representar as roles dos usuários
export enum UsuarioRole{
    PACIENTE = "PACIENTE",
    MEDICO = "MEDICO",
    ADMIN = "ADMIN"
}

@Index(["email"])
@Entity("usuarios")
export class Usuario{
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column("varchar")
    nome!: string

    @Column("varchar")
    email!: string

    @Column("varchar")
    senha!: string

    @Column()
    telefone: string

    @Column({
        type: "enum",
        enum: UsuarioRole,
        default: UsuarioRole.PACIENTE
    })
    role!: UsuarioRole

    @CreateDateColumn()
    criadoEm!: Date
}
