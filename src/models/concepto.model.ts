var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConceptoSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    descripcion: {type: String, require: true},
    credito: {type: Boolean, require: true},
    fechaalta: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Concepto', ConceptoSchema);
