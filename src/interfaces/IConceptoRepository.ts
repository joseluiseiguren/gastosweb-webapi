import { Conceptos } from "../entity/Conceptos";

export interface IConceptoRepository {
    GetByUsuario(idUsuario: number) : Promise<Conceptos[]>;

    GetById(id: number) : Promise<Conceptos>;

    GetConceptosMensual(idUsuario: number, fecha: Date /*MM-YYYY*/) : Promise<any>;
}