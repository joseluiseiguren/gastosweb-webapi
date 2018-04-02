var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovimientoSchema = new Schema({
    fecha: {type: Date, require: true},
    importe: {type: Number, require: true},
    fechaalta: {type: Date, default: Date.now}
});

var ConceptoSchema = new Schema({
    descripcion: {type: String, require: true},
    credito: {type: Boolean, require: true},
    fechaalta: {type: Date, default: Date.now},
    movimientos: [ MovimientoSchema ]
});

var UserSchema = new Schema({
    email: {type: String, require: true},
    nombre: {type: String, require: true},
    fechanacimiento: {type: Date, require: true},
    fechaalta: {type: Date, default: Date.now},
    idestado: {type: Number, require: true},
    password: {type: String, require: true},
    moneda: {type: String, require: true},
    intentosfallidoslogin: {type: Number, default: 0},
    conceptos: [ ConceptoSchema ]
});

module.exports = mongoose.model('User', UserSchema);