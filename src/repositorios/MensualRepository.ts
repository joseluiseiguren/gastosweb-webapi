import { IMensualRepository } from "../interfaces/IMensualRepository";
import { Connection, getConnectionManager, createConnection, getManager } from "typeorm";
import { GetDbConnection } from "./DbConection";

export class MensualRepository implements IMensualRepository {
    
    async GetTotal(idUsuario: number, fecha: string /* YYYYMM */) : Promise<any> {    
        let dbConnection = await GetDbConnection();

        let sql = "select ifnull(sum(case when d.importe > 0 then d.importe else 0 end), 0) ingresos, \
                          ifnull(abs(sum(case when d.importe < 0 then d.importe else 0 end)), 0) egresos \
                    from controlgastos.diario d \
                    inner join controlgastos.conceptos c on c.id = d.idconcepto \
                    inner join controlgastos.usuarios u on u.id = c.idusuario \
                    where u.id = " + idUsuario.toString() + 
                    " and date_format(d.fecha, '%Y%c') = " + fecha;

        //console.log(sql);

        const datos = await getManager().query(sql);

        //console.log(datos);

        return datos[0];
    }
}