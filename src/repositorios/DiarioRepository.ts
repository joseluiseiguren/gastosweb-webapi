import { IConceptoRepository } from "../interfaces/IConceptoRepository";
import { Connection, getConnectionManager, createConnection, getManager } from "typeorm";
import { GetDbConnection } from "./DbConection";
import { IDiarioRepository } from "../interfaces/IDiarioRepository";
import { Diario } from "../entity/Diarios";

export class DiarioRepository implements IDiarioRepository {
    
    async GetByUsuario(idUsuario: number, fecha: Date) : Promise<any[]> {    
        let dbConnection = await GetDbConnection();

        let sql = "select c.id idconcepto, \
                          c.descripcion, \
                          if (c.credito = 0, false, true) credito, \
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

    async GetById(idConcepto: number, fecha: Date) : Promise<Diario> {
        let dbConnection = await GetDbConnection();

        /*let sql = await dbConnection
            .getRepository(Diario)
            .createQueryBuilder("diario") 
            .where("diario.idconcepto = " + idConcepto.toString())
            .andWhere("date(diario.fecha) = '" + fecha.getFullYear().toString() + "-" + (fecha.getMonth()+1).toString() + "-" +  fecha.getDate().toString() + "'")
            .getSql();

        console.log(sql);*/
        
        let diario = await dbConnection
            .getRepository(Diario)
            .createQueryBuilder("diario") 
            .where("diario.idconcepto = " + idConcepto.toString())
            .andWhere("date(diario.fecha) = '" + fecha.getFullYear().toString() + "-" + (fecha.getMonth()+1).toString() + "-" +  fecha.getDate().toString() + "'")
            .getOne();

        return diario;
    }

    async Insert(diario: Diario) : Promise<void> {
        
        let dbConnection = await GetDbConnection();

        //console.log(diario);

        await dbConnection
            .createQueryBuilder()
            .insert()
            .into(Diario)
            .values(
                    {idconcepto: diario.idconcepto, 
                     importe: diario.importe, 
                     fecha: diario.fecha, 
                     fechaalta: diario.fechaalta}) 
            .execute();
    }

    async Update(diario: Diario) : Promise<void> {
        
        let dbConnection = await GetDbConnection();
        let fechaItem = diario.fecha.getFullYear().toString() + "-" + (diario.fecha.getMonth()+1).toString() + "-" + diario.fecha.getDate().toString();

        await dbConnection
            .createQueryBuilder()
            .update(Diario)
            .set({importe: diario.importe})
            .where("idconcepto = :idconcepto and date(fecha) = :fecha", 
                    { idconcepto: diario.idconcepto, 
                      fecha: fechaItem
                    }) 
            .execute();
    }

    async GetMinConsumoByUsuario(idUsuario: number) : Promise<any> {
        let dbConnection = await GetDbConnection();

        let sql = "select date_format(ifnull(min(d.fecha), curdate()), '%Y-%m-%d') fechaMin, \
                          date_format(ifnull(max(d.fecha), curdate()), '%Y-%m-%d') fechaMax \
                    from controlgastos.diario d \
                    inner join controlgastos.conceptos c on c.id = d.idconcepto \
                    inner join controlgastos.usuarios u on u.id = c.idusuario \
                    where c.idusuario = " + idUsuario.toString();

        //console.log(sql);

        const datos = await getManager().query(sql);

        //console.log(datos);
        
        return datos[0];
    }
}