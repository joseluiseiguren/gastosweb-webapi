import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import { Usuarios } from "./usuarios";

@Entity()
export class Conceptos {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idusuario: number;

    @Column()
    descripcion: string;

    @Column()
    credito: boolean;

    @Column()
    fechaalta: Date;

    @Column()
    idestado: number;
}