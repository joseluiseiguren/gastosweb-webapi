var mongoose   = require('mongoose');
var AuditModel = require('../src/models/audit.model');

export function SaveAudit2(idusuario, observacion, aditionalinfo, tipooperacion, location): void {
    let audit = new AuditModel({
        idusuario: idusuario,
        observacion: observacion,
        aditionalinfo: aditionalinfo,
        tipooperacion: tipooperacion,
        location: location
    });
    audit.save(function(err){
        if (err){
            throw err;
        }
    });
    
}