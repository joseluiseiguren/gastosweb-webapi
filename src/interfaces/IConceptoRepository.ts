import { Conceptos } from "../entity/Conceptos";

export interface IConceptoRepository {
    GetByUsuario(idUsuario: number) : Promise<Conceptos[]>;

    GetById(id: number) : Promise<Conceptos>;

    GetByDescrcipcion(idUsuario: number, descripcion: string) : Promise<Conceptos>;

    GetConceptosMensual(idUsuario: number, fecha: Date /*MM-YYYY*/) : Promise<any>;

    GetConceptosMovimMensual(idUsuario: number, fecha: string /*YYYYMM*/, idConcepto: number) : Promise<any>;

    Insert(concepto: Conceptos) : Promise<void>;

    Update(concepto: Conceptos) : Promise<void>;
}