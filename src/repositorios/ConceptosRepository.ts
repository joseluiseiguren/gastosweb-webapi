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

    async GetById(id: number) : Promise<Conceptos> {
        let dbConnection = await GetDbConnection();
        let concRepository = dbConnection.getRepository(Conceptos);
        let concepto = await concRepository.findOneById(id);

        return concepto;
    }

    async GetConceptosMensual(idUsuario: number, fecha: Date /*MM-YYYY*/) : Promise<any> {
        let dbConnection = await GetDbConnection();

        let sql = "select ifnull(sum(d.importe),0) saldo, c.id idconcepto, c.descripcion \
                    from controlgastos.conceptos c \
                    left join controlgastos.diario d on d.idconcepto = c.id \
                    and (date_format(d.fecha, '%Y%c') = '" + 
                    fecha.getFullYear().toString() + (fecha.getMonth()+1).toString() +
                    "' or d.fecha is null) \
                    where c.idusuario = " + idUsuario.toString() +  
                    " group by c.id, c.descripcion \
                    order by c.descripcion asc";

        //console.log(sql);

        const datos = await getManager().query(sql);
        
        return datos;
    }
}