var config = require('../../src/config');
var mongoose = require('mongoose');

// se abre la conexion con la base de datos mongo
mongoose.connect(config.db.strconexion, function(error) {
    if(error !== null){
        throw ({message: "No se Pudo conectar a la base de datos"});
    }
}); 