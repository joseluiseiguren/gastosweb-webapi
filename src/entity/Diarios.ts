import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn} from "typeorm";

@Entity()
export class Diario {

    @PrimaryColumn()
    idconcepto: number;

    @PrimaryColumn()
    fecha: Date;

    @Column()
    importe: number;

    @Column()
    fechaalta: Date;
}