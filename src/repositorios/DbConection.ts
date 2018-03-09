import { Connection, getConnectionManager, createConnection } from "typeorm";
import { Audit } from "../entity/Audit";
import { AuditRepository } from "./AuditRepository";

export async function GetDbConnection(): Promise<Connection> {
    /*let connection: Connection;
    try {
        connection = getConnectionManager().get();
        //console.log('got existing connection');
    } catch (err) {
        //console.log('creating connection');
        connection = await createConnection();
    }

    return connection;*/

    let config = require('../config'); 
    
    let connection: Connection;
    try {
        connection = getConnectionManager().get();
        //console.log('got existing connection');
    } catch (err) {
        //console.log('creating connection');
        connection = await createConnection({type: "mysql",
                                             host: config.db.host,
                                             port: config.db.port,
                                             username: config.db.user,
                                             password: config.db.password,
                                             database: config.db.database,
                                             entities: [
                                                "src/entity/**/*.ts"
                                             ],
                                             synchronize: false,
                                             logging: false,
                                             migrations: [
                                                "src/migration/**/*.ts"
                                             ],
                                             subscribers: [
                                                "src/subscriber/**/*.ts"
                                             ],
                                             cli: {
                                                "entitiesDir": "src/entity",
                                                "migrationsDir": "src/migration",
                                                "subscribersDir": "src/subscriber"
                                             }});
    }

    return connection;
}

export async function SaveAudit(idusuario, observacion, aditionalinfo, tipooperacion): Promise<void> {
    let audit: Audit = new Audit();
    audit.fecha = new Date();
    audit.idusuario = idusuario;
    audit.observacion = observacion;
    audit.aditionalinfo = aditionalinfo;
    audit.tipooperacion = tipooperacion;
    
    let repo = new AuditRepository();
    repo.Insert(audit);
}