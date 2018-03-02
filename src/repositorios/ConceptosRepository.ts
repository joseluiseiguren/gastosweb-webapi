import { IConceptoRepository } from "../interfaces/IConceptoRepository";
import { Conceptos } from "../entity/Conceptos";
import { Connection, getConnectionManager, createConnection, getManager } from "typeorm";
import { GetDbConnection } from "./DbConection";
import { DESTRUCTION } from "dns";

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

    async GetConceptosMovimMensual(idUsuario: number, fecha: string /*YYYYMM*/, idConcepto: number) : Promise<any> {
        let dbConnection = await GetDbConnection();

        let sql = "select d.idconcepto, d.fecha, d.importe \
                    from controlgastos.diario d \
                    inner join controlgastos.conceptos c on c.id = d.idconcepto \
                    inner join controlgastos.usuarios u on u.id = c.idusuario \
                    where c.idusuario = " + idUsuario.toString() +  
                    "  and date_format(d.fecha, '%Y%m') = '" + fecha + "' \
                    and d.idconcepto = " + idConcepto.toString() +  
                    " and d.importe != 0 \
                    order by d.fecha asc";

        //console.log(sql);

        const datos = await getManager().query(sql);
        
        return datos;
    }

    async Insert(concepto: Conceptos) : Promise<void> {
        
        let dbConnection = await GetDbConnection();

        //console.log(diario);

        await dbConnection
            .createQueryBuilder()
            .insert()
            .into(Conceptos)
            .values(
                    {idusuario: concepto.idusuario, 
                     descripcion: concepto.descripcion, 
                     credito: concepto.credito, 
                     idestado: concepto.idestado, 
                     fechaalta: concepto.fechaalta}) 
            .execute();
    }

    async Update(concepto: Conceptos) : Promise<void> {
        
        let dbConnection = await GetDbConnection();

        await dbConnection
            .createQueryBuilder()
            .update(Conceptos)
            .set({descripcion: concepto.descripcion, credito: concepto.credito})
            .where("id = :id", 
                    { id: concepto.id}) 
            .execute();
    }

    async GetByDescrcipcion(idUsuario: number, descripcion: string) : Promise<Conceptos> {
        let dbConnection = await GetDbConnection();
        let concRepository = dbConnection.getRepository(Conceptos);
        let concepto = await concRepository.findOne({idusuario: idUsuario, descripcion: descripcion});

        return concepto;
    }

    async GetConceptosAnual(idUsuario: number, anio: Number /*YYYY*/) : Promise<any> {
        let dbConnection = await GetDbConnection();

        let sql = "select ifnull(sum(d.importe),0) saldo, c.id idconcepto, c.descripcion \
                    from controlgastos.conceptos c \
                    left join controlgastos.diario d on d.idconcepto = c.id \
                    and (date_format(d.fecha, '%Y') = '" + 
                    anio.toString() +
                    "' or d.fecha is null) \
                    where c.idusuario = " + idUsuario.toString() +  
                    " group by c.id, c.descripcion \
                    order by c.descripcion asc";

        const datos = await getManager().query(sql);
        
        return datos;
    }

    async GetConceptosMovimAnual(idUsuario: number, anio: number /*YYYY*/, idConcepto: number) : Promise<any> {
        let dbConnection = await GetDbConnection();

        let sql = "select d.idconcepto, date_format(d.fecha, '%m%Y') as mes, sum(d.importe) as importe \
                    from controlgastos.diario d \
                    inner join controlgastos.conceptos c on c.id = d.idconcepto \
                    inner join controlgastos.usuarios u on u.id = c.idusuario \
                    where c.idusuario = " + idUsuario.toString() +  
                    "  and date_format(d.fecha, '%Y') = '" + anio.toString() + "' \
                    and d.idconcepto = " + idConcepto.toString() +  
                    " and d.importe != 0 \
                    group by d.idconcepto, date_format(d.fecha, '%m-%Y') \
                    order by d.fecha asc";

        //console.log(sql);

        const datos = await getManager().query(sql);
        
        return datos;
    }

    async GetConceptosHistorico(idUsuario: number) : Promise<any> {
        let dbConnection = await GetDbConnection();

        let sql = "select ifnull(sum(d.importe),0) saldo, c.id idconcepto, c.descripcion \
                    from controlgastos.conceptos c \
                    left join controlgastos.diario d on d.idconcepto = c.id \
                    where c.idusuario = " + idUsuario.toString() +  
                    " group by c.id, c.descripcion \
                    order by c.descripcion asc";

        const datos = await getManager().query(sql);
        
        return datos;
    }

    async GetConceptosMovimHistorico(idUsuario: number, idConcepto: number) : Promise<any> {
        let dbConnection = await GetDbConnection();

        let sql = "select d.idconcepto, date_format(d.fecha, '%Y') as anio, sum(d.importe) as importe \
                    from controlgastos.diario d \
                    inner join controlgastos.conceptos c on c.id = d.idconcepto \
                    inner join controlgastos.usuarios u on u.id = c.idusuario \
                    where c.idusuario = " + idUsuario.toString() +  
                    " and d.idconcepto = " + idConcepto.toString() +  
                    " and d.importe != 0 \
                    group by d.idconcepto, date_format(d.fecha, '%Y') \
                    order by d.fecha asc";

        const datos = await getManager().query(sql);
        
        return datos;
    }
}