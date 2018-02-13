import { IConceptoRepository } from "../interfaces/IConceptoRepository";
import { Conceptos } from "../entity/Conceptos";
import { Connection, getConnectionManager, createConnection, getManager } from "typeorm";
import { GetDbConnection } from "./DbConection";
import { IDiarioRepository } from "../interfaces/IDiarioRepository";
import { Diario } from "../entity/Diarios";

export class DiarioRepository implements IDiarioRepository {
    
    async GetByUsuario(idUsuario: number, fecha: Date) : Promise<any[]> {    
        let dbConnection = await GetDbConnection();

        let sql = "select c.id idconcepto, \
                          c.descripcion, \
                          c.credito, \
                          date(d.fecha) fecha, \
                          ifnull(d.importe, 0) importe \
                    from controlgastos.conceptos c \
                    left join controlgastos.diario d on d.idconcepto = c.id \
                    and (date(d.fecha) = '" + 
                    fecha.getFullYear().toString() + "-" + (fecha.getMonth()+1).toString() + "-" +  fecha.getDate().toString() + 
                    "' or d.fecha is null) \
                    where c.idusuario = " + idUsuario.toString() + 
                    " order by c.descripcion asc";

        //console.log(sql);

        const datos = await getManager().query(sql);
        
        /*let sql = await dbConnection
            .getRepository(Conceptos)
            .createQueryBuilder("concepto") 
            .leftJoinAndSelect(
                Diario, 
                "diario", 
                "diario.idconcepto = concepto.id and (date(diario.fecha = '2018-02-03') or diario.fecha is null)")
            .where("concepto.idusuario = " + idUsuario.toString())
            .orderBy("concepto.descripcion", "ASC")
            .getSql();

        console.log(sql);*/

        return datos;
    }
}