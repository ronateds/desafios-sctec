import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany
} from 'typeorm'
import { Usuario } from './Usuario'
import { Consulta } from './Consulta';

@Entity("medicos")
export class Medico{
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @OneToOne(() => Usuario, { eager: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "usuario_id" })
    usuario!: Usuario

    @Column("varchar", { unique: true })
    crm!: string

    @Column("varchar")
    especialidade!: string

    @OneToMany(() => Consulta, (consulta) => consulta.medico)
    consultas!: Consulta[]
}