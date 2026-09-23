import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToOne,
    JoinColumn,
    OneToMany
} from 'typeorm'
import { Usuario } from './Usuario'
import { Consulta } from './Consulta';

@Entity('pacientes')
export class Paciente{
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @OneToOne(() => Usuario, { eager: true, onDelete: "CASCADE" })
    @JoinColumn({ name: "usuario_id" })
    usuario!: Usuario

    @Column({ type: "date", nullable: true, name: "data_nascimento"})
    dataNascimento?: string

    @OneToMany(() => Consulta, (consulta) => consulta.paciente)
    consultas!: Consulta[]
}
