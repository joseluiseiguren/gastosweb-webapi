var config = require('../../src/config');
var mongoose = require('mongoose');

// se abre la conexion con la base de datos mongo
/*mongoose.connect(config.db.strconexion, function(error) {
    if(error !== null){
        throw ({message: "No se Pudo conectar a la base de datos"});
    }
});*/


var options =  { keepAlive: 1, connectTimeoutMS: 30000, reconnectTries: 30, reconnectInterval: 5000 }
mongoose.connect(config.db.strconexion, options, (err) => {
    if(err) {
        console.error("Error while connecting", err);
    }
});