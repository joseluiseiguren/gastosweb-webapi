import { IAuditRepository } from "../interfaces/IAuditRepository";
import { Connection, getConnectionManager, createConnection, getManager } from "typeorm";
import { GetDbConnection } from "./DbConection";
import { Audit } from "../entity/Audit";

export class AuditRepository implements IAuditRepository {
    
    async Insert(audit: Audit) : Promise<void> {
        
        let dbConnection = await GetDbConnection();

        await dbConnection
            .createQueryBuilder()
            .insert()
            .into(Audit)
            .values(
                    {idusuario: audit.idusuario, 
                     fecha: audit.fecha, 
                     tipooperacion: audit.tipooperacion,
                     observacion: audit.observacion,
                     aditionalinfo: audit.aditionalinfo,
                     location: audit.location}) 
            .execute();
    }
}