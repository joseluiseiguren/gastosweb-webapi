import { Usuarios } from "../entity/Usuarios";

export interface IUsuarioRepository {
    GetById(id: number) : Promise<Usuarios>;

    GetByFilter(email: string) : Promise<Usuarios[]>;
}