var AuditModel = require('../mongo.models/audit.mongo.model');
import {auditInterface} from '../interfaces/audit.interface';
import {audit} from '../app.models/audit.app.model';
var conection = require('../mongo.repositories/conection');

export class auditRepositoryMongo implements  auditInterface {
    
    public async Insert(auditoria: audit): Promise<void> {

        let auditM = new AuditModel({
            idusuario: auditoria.idusuario,
            tipooperacion: auditoria.tipooperacion,
            observacion: auditoria.observacion,
            aditionalinfo: auditoria.aditionalinfo,
            location: auditoria.location});

        // se inserta la auditoria
        await auditM.save();        
    }
}