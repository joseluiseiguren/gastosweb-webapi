var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovimientoSchema = new Schema({
    concepto: { type: Schema.Types.ObjectId, ref: 'Concepto' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    fecha: {type: Date, require: true},
    importe: {type: Number, require: true},
    fechaalta: {type: Date, default: Date.now},
    movimTags: [{type: String, require: false}]
});

module.exports = mongoose.model('Movimiento', MovimientoSchema);