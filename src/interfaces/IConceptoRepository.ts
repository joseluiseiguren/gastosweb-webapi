import { Conceptos } from "../entity/Conceptos";

export interface IConceptoRepository {
    GetByUsuario(idUsuario: number) : Promise<Conceptos[]>;
}