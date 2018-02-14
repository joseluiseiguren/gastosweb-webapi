import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn} from "typeorm";

@Entity()
export class Diario {

    @PrimaryColumn()
    idconcepto: number;

    @PrimaryColumn()
    fecha: Date;

    @Column({ type: "decimal", precision: 12, scale: 2 })
    importe: number;

    @Column()
    fechaalta: Date;
}