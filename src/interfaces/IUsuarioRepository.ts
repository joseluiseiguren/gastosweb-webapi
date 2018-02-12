import { Usuarios } from "../entity/Usuarios";

export interface IUsuarioRepository {
    GetById(id: number) : Promise<Usuarios>;
}