var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuditSchema = new Schema({
    idusuario: {type: String},
    fecha: {type: Date, default: Date.now},
    tipooperacion: {type: Number, require: true},
    observacion: {type: String},
    aditionalinfo: {type: String},
    location: {type: String}
});

module.exports = mongoose.model('Audit', AuditSchema);