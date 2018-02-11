import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

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

}
