var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {type: String, require: true},
    nombre: {type: String, require: true},
    fechanacimiento: {type: Date, require: true},
    fechaalta: {type: Date, default: Date.now},
    idestado: {type: Number, require: true},
    password: {type: String, require: true},
    moneda: {type: String, require: true},
    intentosfallidoslogin: {type: Number, default: 0}
});

module.exports = mongoose.model('User', UserSchema);
