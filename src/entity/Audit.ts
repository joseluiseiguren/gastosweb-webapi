import {Entity, PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn} from "typeorm";

@Entity()
export class Audit {

    @PrimaryColumn()
    idusuario: number;

    @PrimaryColumn()
    fecha: Date;

    @PrimaryColumn()
    tipooperacion: number;

    @Column()
    observacion: string;

    @Column()
    aditionalinfo: string;
}