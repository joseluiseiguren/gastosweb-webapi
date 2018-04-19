var mongoose = require('mongoose');
var ConceptoModel = require('../mongo.models/concepto.mongo.model');
var MovimientoModel = require('../mongo.models/movimiento.mongo.model');
import {conceptoInterface} from '../interfaces/concepto.interface';
import { concepto } from '../app.models/concepto.app.model';
import { conceptoSumary } from '../app.models/concepto.sumary.app.model';
import { conceptoMovimiento } from '../app.models/concepto.movimiento.app.model';
import { conceptoMovimientoAnual } from '../app.models/concepto.movimiento.anual.app.model';
import { conceptoMovimientoHist } from '../app.models/concepto.movimiento.hist.app.model';
import { movimientoDiario } from '../app.models/movimiento.diario.app.model';

var conection = require('../mongo.repositories/conection');

export class conceptoRepositoryMongo implements  conceptoInterface {
    
    public async GetByFilter(userId: string, descripcion: string, conceptoId: string): Promise<Array<concepto>> {

        let searchFilter: {[k: string]: any} = {};

        // filtro por userid
        if (userId != undefined &&
            userId.length > 0) {
            searchFilter.user = new mongoose.Types.ObjectId(userId);
        }

        // filtro por conceptoId
        if (conceptoId != undefined &&
            conceptoId.length > 0) {
            searchFilter._id = new mongoose.Types.ObjectId(conceptoId);
        }

        // filtro por descripcion
        if (descripcion != undefined &&
            descripcion.length > 0) {
            searchFilter.descripcion = { $regex: new RegExp("^" + descripcion.toLowerCase(), "i")};
        }
        
        var resultMongo = await ConceptoModel.find(searchFilter, { __v: 0 }).sort('descripcion'); ;

        var lstConcep = resultMongo.map(function(conceptoMongo){ 
            let cnp: concepto = new concepto();

            cnp._id = conceptoMongo._id;
            cnp.descripcion = conceptoMongo.descripcion;
            cnp.credito = conceptoMongo.credito;
            cnp.user = conceptoMongo.user;
            cnp.fechaalta = conceptoMongo.fechaalta;
            
            return cnp;
        });

        return lstConcep;
    }    

    public async GetMensualSumary(idUsuario: string, anio: number, mes: number): Promise<Array<conceptoSumary>> {

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

        var resp = new Array<conceptoSumary>();
        let conceptos = ConceptoModel.find({user:idUsuario}).sort('descripcion').cursor();
        for (let doc = await conceptos.next(); doc != null; doc = await conceptos.next()) {
            let foo: conceptoSumary = new conceptoSumary();
            foo.idConcepto = doc._id.toString();
            foo.descripcion = doc.descripcion;

            var totalconcepto = await MovimientoModel.aggregate(
                [
                    {"$match": {
                        "user": new mongoose.Types.ObjectId(idUsuario),
                        "concepto": new  mongoose.Types.ObjectId(doc._id),
                        "fecha": {$gte: fechaDesde, $lt: fechaHasta}}
                    },
                    {$group: {
                        _id : "$concepto",
                        importe : { $sum : "$importe" }
                        }
                    }
                ]
            );

            foo.saldo = (totalconcepto.length > 0) ? totalconcepto[0].importe : 0;
            resp.push(foo);
        }

        return resp;
    }

    public async GetMensualByConcept(idUsuario: string, idConcepto: string, anio: number, mes: number): Promise<Array<conceptoMovimiento>> {

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

        let movimientos = await MovimientoModel.aggregate(
            [
                {"$match": {
                    "user": new  mongoose.Types.ObjectId(idUsuario),
                    "concepto": new  mongoose.Types.ObjectId(idConcepto),
                    "fecha": {$gte: fechaDesde, $lt: fechaHasta},
                    "importe": {$ne:0}}
                },
                {$group: {
                    _id : "$fecha" ,
                    importe : { $sum : "$importe" }
                    }
                },
                { $sort : { _id : 1 } }
            ]
        );

        var resp = new Array<conceptoMovimiento>();

        movimientos.forEach(element => {
            let item: conceptoMovimiento = new conceptoMovimiento();
            item.fecha = element._id;
            item.importe = element.importe;
            
            resp.push(item)
        });                

        return resp;
    }

    public async Insert(concepto: concepto): Promise<void> {

        let conceptoM = new ConceptoModel({
            descripcion: concepto.descripcion,
            credito: concepto.credito,
            user: concepto.user});

        // se inserta el concepto
        await conceptoM.save();        
    }

    public async Update(concepto: concepto): Promise<void> {

        // se actualiza el concepto
        await ConceptoModel.update(
            {_id: new mongoose.Types.ObjectId(concepto._id)}, 
            {credito: concepto.credito,
             descripcion: concepto.descripcion}
        );
        
    }

    public async GetAnualSumary(idUsuario: string, anio: number): Promise<Array<conceptoSumary>> {

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

        var resp = new Array<conceptoSumary>();
        let conceptos = ConceptoModel.find({user:idUsuario}).sort('descripcion').cursor();
        for (let doc = await conceptos.next(); doc != null; doc = await conceptos.next()) {
            let foo: conceptoSumary = new conceptoSumary();
            foo.idConcepto = doc._id.toString();
            foo.descripcion = doc.descripcion;

            var totalconcepto = await MovimientoModel.aggregate(
                [
                    {"$match": {
                        "user": new mongoose.Types.ObjectId(idUsuario),
                        "concepto": new  mongoose.Types.ObjectId(doc._id),
                        "fecha": {$gte: fechaDesde, $lt: fechaHasta}}
                    },
                    {$group: {
                        _id : "$concepto",
                        importe : { $sum : "$importe" }
                        }
                    }
                ]
            );

            foo.saldo = (totalconcepto.length > 0) ? totalconcepto[0].importe : 0;
            resp.push(foo);
        }

        return resp;
    }

    public async GetAnualByConcept(idUsuario: string, idConcepto: string, anio: number): Promise<Array<conceptoMovimientoAnual>> {

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

        let movimientos = await MovimientoModel.aggregate(
            [
                {"$match": {
                    "user": new  mongoose.Types.ObjectId(idUsuario),
                    "concepto": new  mongoose.Types.ObjectId(idConcepto),
                    "fecha": {$gte: fechaDesde, $lt: fechaHasta},
                    "importe": {$ne:0}}
                },
                {$group: {
                    _id : { $month : "$fecha" } ,
                    importe : { $sum : "$importe" }
                    }
                },
                { $sort : { _id : 1 } }
            ]
        );

        var resp = new Array<conceptoMovimientoAnual>();

        movimientos.forEach(element => {
            let item: conceptoMovimientoAnual = new conceptoMovimientoAnual();
            item.mes = element._id.toString().padStart(2, '0') + anio.toString();
            item.importe = element.importe;
            
            resp.push(item)
        });                

        return resp;
    }

    public async GetHistoricoSumary(idUsuario: string): Promise<Array<conceptoSumary>> {

        var resp = new Array<conceptoSumary>();
        let conceptos = ConceptoModel.find({user:idUsuario}).sort('descripcion').cursor();
        for (let doc = await conceptos.next(); doc != null; doc = await conceptos.next()) {
            let foo: conceptoSumary = new conceptoSumary();
            foo.idConcepto = doc._id.toString();
            foo.descripcion = doc.descripcion;

            var totalconcepto = await MovimientoModel.aggregate(
                [
                    {"$match": {
                        "user": new mongoose.Types.ObjectId(idUsuario),
                        "concepto": new  mongoose.Types.ObjectId(doc._id)}
                    },
                    {$group: {
                        _id : "$concepto",
                        importe : { $sum : "$importe" }
                        }
                    }
                ]
            );

            foo.saldo = (totalconcepto.length > 0) ? totalconcepto[0].importe : 0;
            resp.push(foo);
        }

        return resp;
    }

    public async GetHistoricoByConcept(idUsuario: string, idConcepto: string): Promise<Array<conceptoMovimientoHist>> {

        let movimientos = await MovimientoModel.aggregate(
            [
                {"$match": {
                    "user": new  mongoose.Types.ObjectId(idUsuario),
                    "concepto": new  mongoose.Types.ObjectId(idConcepto),
                    "importe": {$ne:0}}
                },
                {$group: {
                    _id : { $year : "$fecha" } ,
                    importe : { $sum : "$importe" }
                    }
                },
                { $sort : { _id : 1 } }
            ]
        );

        var resp = new Array<conceptoMovimientoHist>();

        movimientos.forEach(element => {
            let item: conceptoMovimientoHist = new conceptoMovimientoHist();
            item.anio = element._id;
            item.importe = element.importe;
            
            resp.push(item)
        });                

        return resp;
    }

    public async GetDiarioSumary(idUsuario: string, anio: number, mes: number, dia: number): Promise<Array<movimientoDiario>> {

        let fechaDesde: Date = new Date();
        fechaDesde.setFullYear(anio);
        fechaDesde.setUTCMonth(mes-1);
        fechaDesde.setUTCDate(dia);
        fechaDesde.setUTCHours(0);
        fechaDesde.setUTCMinutes(0);
        fechaDesde.setUTCSeconds(0);
        fechaDesde.setUTCMilliseconds(0);

        let fechaHasta: Date = new Date();
        fechaHasta.setFullYear(anio);
        fechaHasta.setUTCMonth(mes-1);
        fechaHasta.setUTCDate(dia);
        fechaHasta.setUTCHours(23);
        fechaHasta.setUTCMinutes(59);
        fechaHasta.setUTCSeconds(59);
        fechaHasta.setUTCMilliseconds(0);

        var resp = new Array<movimientoDiario>();
        let conceptos = ConceptoModel.find({user:idUsuario}).sort('descripcion').cursor();
        for (let doc = await conceptos.next(); doc != null; doc = await conceptos.next()) {
            let foo: movimientoDiario = new movimientoDiario();
            foo.idconcepto = doc._id.toString();
            foo.descripcion = doc.descripcion;
            foo.credito = doc.credito;
            foo.fecha = fechaDesde;
            foo.importe = 0;
            
            let movimiento = MovimientoModel.find(
                {concepto:doc._id, 
                 fecha: {$gte: fechaDesde, $lte: fechaHasta}}).cursor();

            for (let mov = await movimiento.next(); mov != null; mov = await movimiento.next()) {
                foo.importe = mov.importe;
            }

            resp.push(foo);            
        }

        return resp;
    }
}