var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovimientoTagSchema = new Schema({
    movimiento: { type: Schema.Types.ObjectId, ref: 'Movimiento' },
    tag: {type: String, require: true}
});

module.exports = mongoose.model('MovimientoTag', MovimientoTagSchema);