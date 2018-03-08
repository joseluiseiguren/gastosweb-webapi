import { IAnualRepository } from "../interfaces/IAnualRepository";
import { Connection, getConnectionManager, createConnection, getManager } from "typeorm";
import { GetDbConnection } from "./DbConection";

export class AnualRepository implements IAnualRepository {
    
    async GetTotal(idUsuario: number, fecha: number) : Promise<any> {    
        let dbConnection = await GetDbConnection();

        let sql = "select ifnull(sum(case when d.importe > 0 then d.importe else 0 end), 0) ingresos, \
                          ifnull(abs(sum(case when d.importe < 0 then d.importe else 0 end)), 0) egresos \
                    from diario d \
                    inner join conceptos c on c.id = d.idconcepto \
                    inner join usuarios u on u.id = c.idusuario \
                    where u.id = " + idUsuario.toString() + 
                    " and date_format(d.fecha, '%Y') = " + fecha;

        const datos = await getManager().query(sql);

        return datos[0];
    }
}