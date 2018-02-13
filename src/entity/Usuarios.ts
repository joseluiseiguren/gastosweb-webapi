import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Conceptos } from "./conceptos";

@Entity()
export class Usuarios {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    nombre: string;

    @Column()
    fechanacimiento: Date;

    @Column()
    fechaalta: Date;

    @Column()
    idestado: number;

    @Column()
    password: string;
}
