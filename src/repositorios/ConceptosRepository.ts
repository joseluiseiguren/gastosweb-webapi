import { IConceptoRepository } from "../interfaces/IConceptoRepository";
import { Conceptos } from "../entity/Conceptos";
import { Connection, getConnectionManager, createConnection, getManager } from "typeorm";
import { GetDbConnection } from "./DbConection";

export class ConceptosRepository implements IConceptoRepository {
    
    async GetByUsuario(idUsuario: number) : Promise<Conceptos[]> {    
        let dbConnection = await GetDbConnection();

        let conceptos = await dbConnection
            .getRepository(Conceptos)
            .createQueryBuilder("concepto")
            .where("concepto.idusuario = " + idUsuario.toString())
            .orderBy("concepto.descripcion", "ASC")
            .getMany();

        return conceptos;
    }
}