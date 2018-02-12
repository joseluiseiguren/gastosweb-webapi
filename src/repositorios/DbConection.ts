import { Connection, getConnectionManager, createConnection } from "typeorm";

export async function GetDbConnection(): Promise<Connection> {
    let connection: Connection;
    try {
        connection = getConnectionManager().get();
        //console.log('got existing connection');
    } catch (err) {
        //console.log('creating connection');
        connection = await createConnection();
    }

    return connection;

}