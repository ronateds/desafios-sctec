import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToOne,
    JoinColumn,
    ManyToOne
} from 'typeorm'
import { Medico } from './Medico'
import { Paciente } from './Paciente'

export enum ConsultaStatus {
    AGENDADA = "AGENDADA",
    REALIZADA = "REALIZADA",
    CANCELADA = "CANCELADA",
}

@Entity("consultas")
export class Consulta{
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @ManyToOne(() => Paciente, (paciente) => paciente.consultas, {
        eager: true,
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "paciente_id" })
    paciente!: Paciente

    @ManyToOne(() => Medico, (medico) => medico.consultas, {
        eager: true,
        onDelete: "CASCADE"
    })
    @JoinColumn({ name: "medico_id" })
    medico!: Medico

    @Column({ type: "timestamp", name: "data_hora"})
    dataHora!: Date
    
    @Column({ 
        type: "enum",
        enum: ConsultaStatus,
        default: ConsultaStatus.AGENDADA
    })
    status!: ConsultaStatus

    @Column({nullable: true})
    observacoes?: string

    @CreateDateColumn({name:"criado_em"})
    criadoEm!: Date

}