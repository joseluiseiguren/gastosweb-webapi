var mongoose = require('mongoose');
var MovimientoModel = require('../mongo.models/movimiento.mongo.model');
var MovimientoTagModel = require('../mongo.models/movimiento_tag.mongo.model');
import { movimientoInterface } from '../interfaces/movimiento.interface';
import { sumaryMovimiento } from '../app.models/movimiento.sumary.app.model';
import { movimiento } from '../app.models/movimiento.app.model';
import { movimiento_tag } from '../app.models/movimiento_tag.app.model';
import { firstlastMovimiento } from '../app.models/movimiento.firstlast.app.model';

var conection = require('../mongo.repositories/conection');

export class movimientoRepositoryMongo implements  movimientoInterface {
    
    public async GetMensualSumary(idUsuario: string, anio: number, mes: number): Promise<sumaryMovimiento> {

        let fechaDesde: Date = new Date();
        fechaDesde.setFullYear(anio);
        fechaDesde.setUTCMonth(mes-1);
        fechaDesde.setUTCDate(1);
        fechaDesde.setUTCHours(0);
        fechaDesde.setUTCMinutes(0);
        fechaDesde.setUTCSeconds(0);
        fechaDesde.setUTCMilliseconds(0);

        let fechaHasta: Date = new Date();
        fechaHasta.setFullYear(anio);
        fechaHasta.setUTCMonth(mes);
        fechaHasta.setUTCDate(1);
        fechaHasta.setUTCHours(0);
        fechaHasta.setUTCMinutes(0);
        fechaHasta.setUTCSeconds(0);
        fechaHasta.setUTCMilliseconds(0);

        // obtengo el total de ingresos
        let ingresos = await MovimientoModel.aggregate(
            [
                {"$match": {
                    "user": new  mongoose.Types.ObjectId(idUsuario), 
                    "importe":{$gt:0},
                    "fecha": {$gte:fechaDesde, $lt: fechaHasta}}
                },
                {$group: {_id: '$user', ingresos: {$sum: "$importe"}}}
            ]
        );

        // obtengo el total de ingresos
        let egresos = await MovimientoModel.aggregate(
            [
                {"$match": {
                    "user": new  mongoose.Types.ObjectId(idUsuario), 
                    "importe":{$lt:0},
                    "fecha": {$gte:fechaDesde, $lt: fechaHasta}}
                },
                {$group: {_id: '$user', egresos: {$sum: "$importe"}}}
            ]
        );
        
        let resp: sumaryMovimiento = new sumaryMovimiento();
        resp.ingresos = (ingresos[0] !== undefined) ? ingresos[0].ingresos : 0;
        resp.egresos = (egresos[0] !== undefined) ? Math.abs(egresos[0].egresos) : 0;

        return resp;
    }

    public async GetAnualSumary(idUsuario: string, anio: number): Promise<sumaryMovimiento> {

        let fechaDesde: Date = new Date();
        fechaDesde.setFullYear(anio);
        fechaDesde.setUTCMonth(0);
        fechaDesde.setUTCDate(1);
        fechaDesde.setUTCHours(0);
        fechaDesde.setUTCMinutes(0);
        fechaDesde.setUTCSeconds(0);
        fechaDesde.setUTCMilliseconds(0);

        let fechaHasta: Date = new Date();
        fechaHasta.setFullYear(anio);
        fechaHasta.setUTCMonth(11);
        fechaHasta.setUTCDate(31);
        fechaHasta.setUTCHours(23);
        fechaHasta.setUTCMinutes(59);
        fechaHasta.setUTCSeconds(59);
        fechaHasta.setUTCMilliseconds(0);

        // obtengo el total de ingresos
        let ingresos = await MovimientoModel.aggregate(
            [
                {"$match": {
                    "user": new  mongoose.Types.ObjectId(idUsuario), 
                    "importe":{$gt:0},
                    "fecha": {$gte:fechaDesde, $lte: fechaHasta}}
                },
                {$group: {_id: '$user', ingresos: {$sum: "$importe"}}}
            ]
        );

        // obtengo el total de ingresos
        let egresos = await MovimientoModel.aggregate(
            [
                {"$match": {
                    "user": new  mongoose.Types.ObjectId(idUsuario), 
                    "importe":{$lt:0},
                    "fecha": {$gte:fechaDesde, $lte: fechaHasta}}
                },
                {$group: {_id: '$user', egresos: {$sum: "$importe"}}}
            ]
        );
        
        let resp: sumaryMovimiento = new sumaryMovimiento();
        resp.ingresos = (ingresos[0] !== undefined) ? ingresos[0].ingresos : 0;
        resp.egresos = (egresos[0] !== undefined) ? Math.abs(egresos[0].egresos) : 0;

        return resp;
    }

    public async GetHistoricoSumary(idUsuario: string): Promise<sumaryMovimiento> {

        // obtengo el total de ingresos
        let ingresos = await MovimientoModel.aggregate(
            [
                {"$match": {
                    "user": new  mongoose.Types.ObjectId(idUsuario), 
                    "importe":{$gt:0}}
                },
                {$group: {_id: '$user', ingresos: {$sum: "$importe"}}}
            ]
        );

        // obtengo el total de ingresos
        let egresos = await MovimientoModel.aggregate(
            [
                {"$match": {
                    "user": new  mongoose.Types.ObjectId(idUsuario), 
                    "importe":{$lt:0}}
                },
                {$group: {_id: '$user', egresos: {$sum: "$importe"}}}
            ]
        );
        
        let resp: sumaryMovimiento = new sumaryMovimiento();
        resp.ingresos = (ingresos[0] !== undefined) ? ingresos[0].ingresos : 0;
        resp.egresos = (egresos[0] !== undefined) ? Math.abs(egresos[0].egresos) : 0;

        return resp;
    }

    public async GetByFilter(idUsuario: string, idConcepto: string, fechaDesde: Date, fechaHasta: Date): Promise<Array<movimiento>> {

        let searchFilter: {[k: string]: any} = {};

        // filtro por idUsuario
        if (idUsuario != undefined &&
            idUsuario.length > 0) {
            searchFilter.user = idUsuario;
        }

        // filtro por idConcepto
        if (idConcepto != undefined &&
            idConcepto.length > 0) {
            searchFilter.concepto = idConcepto;
        }

        // filtro por fechas
        if (fechaDesde != undefined && fechaHasta != undefined) {
            searchFilter.fecha = {$gte: fechaDesde, $lte: fechaHasta};
        }

        var resultMongo = await MovimientoModel.find(searchFilter, { __v: 0 });

        var lstUser = resultMongo.map(function(movMongo){ 
            let mov: movimiento = new movimiento();

            mov._id = movMongo._id;
            mov.concepto = movMongo.concepto;
            mov.fecha = movMongo.fecha;
            mov.fechaalta = movMongo.fechaalta;
            mov.importe = movMongo.importe;
            mov.user = movMongo.user;
            
            return mov;
        });

        return lstUser;
    }

    public async Insert(mov: movimiento): Promise<any> {

        let movM = new MovimientoModel({
            concepto: mov.concepto,
            user: mov.user,    
            fecha: mov.fecha,
            importe: mov.importe
        });

        await movM.save((function (_id) {
            return function () {              
            };
          })(movM._id));

          return movM._id;
    }

    public async InsertTag(mov: movimiento_tag): Promise<void> {

        let movTagModel = new MovimientoTagModel({
            movimiento: mov.movimiento,
            tag: mov.tag
        });

        // se inserta el movimiento_tag
        await movTagModel.save();        
    }

    public async Update(mov: movimiento): Promise<void> {

        // se actualiza el movimiento
        await MovimientoModel.update(
            {_id: new mongoose.Types.ObjectId(mov._id)}, 
            {concepto: mov.concepto,
                user: mov.user,
                fecha: mov.fecha,
                importe: mov.importe}
        );
        
    }

    public async GetFirstLast(idUsuario: string): Promise<firstlastMovimiento> {

        // busca el max de fecha
        let last = await MovimientoModel.findOne()
            .where({user:idUsuario})
            .sort('-fecha');

        // busca el min de fecha
        let fisrt = await MovimientoModel.findOne()
                    .where({user:idUsuario})
                    .sort('fecha');
                    
        let result: firstlastMovimiento = new firstlastMovimiento();
        result.fechaMax = last.fecha;
        result.fechaMin = fisrt.fecha;

        return result;
    }

    public async RemoveTagsForMovement(idMovimiento: string): Promise<void> {

        let searchFilter: {[k: string]: any} = {};

        // filtro por idMovimiento
        if (idMovimiento != undefined &&
            idMovimiento.length > 0) {
            searchFilter.concepto = idMovimiento;
        }

        await MovimientoTagModel.find(searchFilter, { __v: 0 }).remove();        
    }
}