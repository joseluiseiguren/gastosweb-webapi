import { Diario } from "../entity/Diarios";

export interface IDiarioRepository {

    GetByUsuario(idUsuario: number, fecha: Date) : Promise<any[]>;

    GetById(idConcepto: number, fecha: Date) : Promise<Diario>;

    Insert(diario: Diario) : Promise<void>;

    Update(diario: Diario) : Promise<void>;
}