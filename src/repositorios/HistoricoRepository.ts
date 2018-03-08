import { IHistoricoRepository } from "../interfaces/IHistoricoRepository";
import { Connection, getConnectionManager, createConnection, getManager } from "typeorm";
import { GetDbConnection } from "./DbConection";

export class HistoricoRepository implements IHistoricoRepository {
    
    async GetTotal(idUsuario: number) : Promise<any> {    
        let dbConnection = await GetDbConnection();

        let sql = "select ifnull(sum(case when d.importe > 0 then d.importe else 0 end), 0) ingresos, \
                          ifnull(abs(sum(case when d.importe < 0 then d.importe else 0 end)), 0) egresos \
                    from diario d \
                    inner join conceptos c on c.id = d.idconcepto \
                    inner join usuarios u on u.id = c.idusuario \
                    where u.id = " + idUsuario.toString();

        const datos = await getManager().query(sql);

        return datos[0];
    }
}