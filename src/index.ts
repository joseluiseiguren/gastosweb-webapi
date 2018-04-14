import "reflect-metadata";
import { SaveAudit2 } from "./GenericFunctions";

var express         = require('express');
var cors            = require('cors');
var HttpStatus      = require('http-status-codes');
var passwordHash    = require('password-hash');
var morgan          = require('morgan');
var jwt             = require('jsonwebtoken');
var config          = require('./config'); 
var bodyParser      = require('body-parser');
var uuid            = require('uuid');
var log4js          = require('log4js');
var mongoose        = require('mongoose');

var UserModel = require('../src/models/user.model');
var ConceptoModel = require('../src/models/concepto.model');
var MovimientoModel = require('../src/models/movimiento.model');

// configuracion de log4j
log4js.configure({ 
    appenders: {
      out: { type: 'console' }, 
      task: { type: 'dateFile', filename: 'logs/task',"pattern":"-dd.log", alwaysIncludePattern:true }, 
      result: { type: 'dateFile', filename: 'logs/result',"pattern":"-dd.log", alwaysIncludePattern:true}, 
      error: { type: 'dateFile', filename: 'logs/error', "pattern":"-dd.log",alwaysIncludePattern:true}, 
      default: { type: 'dateFile', filename: 'logs/default', "pattern":"-dd.log",alwaysIncludePattern:true}, 
      rate: { type: 'dateFile', filename: 'logs/rate', "pattern":"-dd.log",alwaysIncludePattern:true} 
    },
    categories: {
      default: { appenders: ['out','default'], level: 'info' },
      task: { appenders: ['task'], level: 'info'},
      result: { appenders: ['result'], level: 'info' },
      error: { appenders: ['error'], level: 'error' },
      rate: { appenders: ['rate'], level: 'info' }
    }
});
var logger = log4js.getLogger();

/* VERIFICA QUE LAS VARIABLES DE ENTORNO ESTEN SETEADAS */
if (process.env.NODE_ENV === undefined){
    logger.error({errorId: 1, message: "Variables de entorno no seteada: NODE_ENV"});
    process.exit(1);
}

switch (process.env.NODE_ENV) {
    case "dev":
        logger.info({message: "Working in Dev"});
        if (process.env.DEV_APP_PORT === undefined ||
            process.env.DEV_SECRETHASH === undefined ||
            process.env.DEV_EXPIRACION_TOKEN === undefined ||
            process.env.DEV_INTENTOS_FALLIDOS_LOGIN === undefined ||
            process.env.DEV_DB === undefined){
                logger.error({errorId: 1, message: "Variables de entorno de DEV no seteadas"});
                process.exit(1);
            }            
        break;

    case "production":
        logger.info({message: "Working in Prod"});
        if (process.env.PROD_APP_PORT === undefined ||
            process.env.PROD_SECRETHASH === undefined ||
            process.env.PROD_EXPIRACION_TOKEN === undefined ||
            process.env.PROD_INTENTOS_FALLIDOS_LOGIN === undefined ||
            process.env.PROD_DB === undefined){
                logger.error({errorId: 1, message: "Variables de entorno de PROD no seteadas"});
                process.exit(1);
            }
        break;

    default:
        logger.error({errorId: 1, message: "Variables de entorno NODE_ENV invalida: " + process.env.NODE_ENV});
        process.exit(1);
}

// se abre la conexion con la base de datos mongo
mongoose.connect(config.db.strconexion);

let app = express();
app.use(cors())
app.use(bodyParser.json());
app.set('jwtsecret', config.secrethash.key);

var apiRoutes = express.Router();
const TIPOOPERACION = Object.freeze({LOGINOK: 1, LOGINDENIED: 2});
const USUARIOSESTADOS = Object.freeze({NORMAL: 0, BLOQUEADO: 1});

/**** USUARIOS ******************************************************************************************/

// se pide un login y se entrega un token
apiRoutes.post('/usuarios/login', async (request, response, next) => {
    
    try {
        const email = request.body.email,
            password = request.body.password,
            location = request.body.location;

        if (password === undefined ||
            email === undefined) {
            let responseMessage = {message: "Email / Password no informado"};
            response.status(HttpStatus.BAD_REQUEST).send(responseMessage).end();
            SaveAudit2(0, JSON.stringify(responseMessage), JSON.stringify(request.body), TIPOOPERACION.LOGINDENIED, location);
            return;
        }

        // se obtiene el usuario via email
        UserModel.find(
            {email: { $regex: new RegExp("^" + email.toLowerCase(), "i")}},
            function(err, results){
            if (err) {
                setImmediate(() => { next(new Error(JSON.stringify(err))); });
                return;
            }
            if(results.length <= 0){
                let responseMessage = {message: "Usuario Inexistente"};
                response.status(HttpStatus.UNAUTHORIZED).send(responseMessage).end();
                SaveAudit2(0, JSON.stringify(responseMessage), JSON.stringify(request.body), TIPOOPERACION.LOGINDENIED, location);
                return;
            }
            else{
                // se valida que el usuairo no este bloqueado
                if (results[0].idestado === USUARIOSESTADOS.BLOQUEADO) {
                    let responseMessage = {message: "Usuario Bloqueado"};
                    response.status(HttpStatus.UNAUTHORIZED).send(responseMessage).end();
                    SaveAudit2(results[0]._id, JSON.stringify(responseMessage), JSON.stringify(request.body), TIPOOPERACION.LOGINDENIED, location);
                    return;
                
                // se valida el password
                } else if (passwordHash.verify(password, results[0].password) === false) {
                    
                    let fieldsToUpdate = {intentosfallidoslogin: results[0].intentosfallidoslogin + 1, 
                                          idestado: results[0].idestado};

                    // se bloquea el usuario
                    if (results[0].intentosfallidoslogin == config.app.intentosfallidoslogin*1) {
                        fieldsToUpdate.idestado = USUARIOSESTADOS.BLOQUEADO;
                    }

                    // se actualiza el usuario
                    UserModel.update({_id: results[0]._id}, fieldsToUpdate, function(err, numberAffected, rawResponse){
                        if (err) {
                            setImmediate(() => { next(new Error(JSON.stringify(err))); });
                            return;
                        }                      
                    });

                    let responseMessage = {message: "Password Invalido"};
                    response.status(HttpStatus.UNAUTHORIZED).send(responseMessage).end();
                    SaveAudit2(results[0]._id, JSON.stringify(responseMessage), JSON.stringify(request.body), TIPOOPERACION.LOGINDENIED, location);
                    return;
                } else {
                    // se actualizan los intentos fallidos del usuario
                    UserModel.update({_id: results[0]._id}, {intentosfallidoslogin: 0}, function(err, numberAffected, rawResponse){
                        if (err) {
                            setImmediate(() => { next(new Error(JSON.stringify(err))); });
                            return;
                        }
                        
                        const payload = {
                            user: results[0].nombre,
                            id: results[0]._id,
                            moneda: results[0].moneda, 
                        };

                        //var token = jwt.sign(payload, app.get('jwtsecret'), { expiresIn : 60*60*24 });
                        var token = jwt.sign(payload, app.get('jwtsecret'), { expiresIn : config.app.expiraciontoken*1 });

                        response.status(HttpStatus.OK).send({token: token});
                        SaveAudit2(results[0]._id, null, null, TIPOOPERACION.LOGINOK, location);     
                    });                    
                }
            }
        });        
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});

// se da de alta un usuario
apiRoutes.post('/usuarios/registracion', async (request, response, next) => {
    
    try {
        const email = request.body.email,
            password = request.body.password,
            nombre = request.body.nombre,
            fechanacimiento = request.body.fechanacimiento, /* YYYYMMDD */
            moneda = request.body.moneda;

        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        re.test(String(email).toLowerCase());

        if (email === undefined ||
            re.test(String(email).toLowerCase()) === false ||
            email.length <= 0) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Email Invalido"}).end();
            return;
        }

        if (password === undefined ||
            password.length <= 0) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Password Invalido"}).end();
            return;
        }

        if (nombre === undefined ||
            nombre.length <= 0) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Nombre Invalido"}).end();
            return;
        }

        if (moneda === undefined ||
            moneda.length > 3 ||
            moneda.length <= 0) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Moneda Invalida"}).end();
            return;
        }

        if (fechanacimiento === undefined ||
            fechanacimiento.length != 8 ||
            isNaN(fechanacimiento)) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Fecha Nacimiento Invalida"}).end();
            return;
        }

        let fechaParam: Date = new Date(
                            Number(fechanacimiento.substring(0, 4)), 
                            Number(fechanacimiento.substring(4, 6))-1, 
                            Number(fechanacimiento.substring(6, 8))+1, 
                            0, 0, 0, 0);
        fechaParam.setUTCHours(0, 0, 0, 0);

        // valida que el usuario no exista
        UserModel.find(
            {email: { $regex: new RegExp("^" + email.toLowerCase(), "i")}},
            function(err, results){
            if (err) {
                setImmediate(() => { next(new Error(JSON.stringify(err))); });
                return;
            }
            if(results.length > 0){
                response.status(HttpStatus.BAD_REQUEST).send({message: "Ya existe un usuario con el mismo email"}).end();
                return;
            }
            else{
                // se hashea el password
                let hashedPassword = passwordHash.generate(password);

                let userM = new UserModel({
                    email: email,
                    nombre: nombre,
                    fechanacimiento: fechaParam,
                    idestado: 0,
                    moneda: moneda,
                    password: hashedPassword
                });
                userM.save(function(err){
                    if (err) {
                        setImmediate(() => { next(new Error(JSON.stringify(err))); });
                        return;
                    }
                    else {
                        response.status(HttpStatus.OK).send();
                    }
                });
            }
        });        
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});

// middleware para validar el token
apiRoutes.use(function(request, response, next) {

    try {
        // tuvo que haber venido en el header http
        var token = request.headers['x-access-token'];
    
        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, 
                        app.get('jwtsecret'), 
                        function(err, decoded) {      
                            if (err){
                                response.status(HttpStatus.UNAUTHORIZED).send({message: "Token Invalido"}).end();
                                return;
                            } else {
                                request.decoded = decoded;    
                                next();
                            }
                        });
        } else {
            // there is no token
            response.status(HttpStatus.UNAUTHORIZED).send({message: "Token Invalido"}).end();
            return;
        }
    } catch(err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});

//obtiene una lista de usuarios segun filtros
apiRoutes.get('/usuarios', async function(request, response, next) {
    
    try {
        let searchFilter: {[k: string]: any} = {};

        // filtro por email
        if (request.query.email != undefined &&
            request.query.email.length > 0) {
            searchFilter.email = request.query.email;
        }

        UserModel.find(searchFilter, { conceptos: 0, __v: 0 } , function(err, results){
            if (err) {
                setImmediate(() => { next(new Error(JSON.stringify(err))); });
                return;
            }
            response.status(HttpStatus.OK).send(results).end();
        });        
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});

//obtiene todos los conceptos de un usuario
apiRoutes.get('/usuarios/conceptos', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id;
        if (idUsuario === undefined) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        ConceptoModel.find({user: idUsuario}, {user:0, __v:0},
            function(err, results){
                if (err) {                    
                    setImmediate(() => { next(new Error(JSON.stringify(err))); });
                    return;
                }
                response.status(HttpStatus.OK).send(results).end();
            }
        ).sort('descripcion'); 
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});

//obtiene un usuario por id
apiRoutes.get('/usuarios/:id', async function (request, response, next) {
    
    try {
        let id = request.params.id;
        if (id === undefined) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        UserModel.findOne({_id:id}, {_id:0, conceptos: 0, __v:0}, function(err, results){
            if (err) {
                setImmediate(() => { next(new Error(JSON.stringify(err))); });
                return;
            }
            response.status(HttpStatus.OK).send(results).end();            
        });
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});

//actualiza un un usuario
apiRoutes.put('/usuario', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id,
            email: string = request.body.email,
            password = request.body.password,
            fechanacimiento = request.body.fechanacimiento,
            moneda = request.body.moneda,
            nombre = request.body.nombre;

        let fechaNacimParsed: Date = undefined;

        if (idUsuario === undefined) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        re.test(String(email).toLowerCase());

        if (email != undefined && 
            email.length > 0 &&
            re.test(String(email).toLowerCase()) === false) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Email Invalido"}).end();
            return;
        }

        if (moneda != undefined &&
            (moneda.length > 3 ||
            moneda.length <= 0)) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Moneda Invalida"}).end();
            return;
        }

        if (fechanacimiento != undefined &&
            (fechanacimiento.length != 8 ||
            isNaN(fechanacimiento))) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Fecha Nacimiento Invalida"}).end();
            return;
        }

        if (fechanacimiento != undefined) {
            fechaNacimParsed = new Date(
                Number(fechanacimiento.substring(0, 4)), 
                Number(fechanacimiento.substring(4, 6))-1, 
                Number(fechanacimiento.substring(6, 8))+1, 
                0, 0, 0, 0);
            fechaNacimParsed.setUTCHours(0, 0, 0, 0);
        }

        // se obtiene el usuario via email
        UserModel.find(
            {email: { $regex: new RegExp("^" + email.toLowerCase(), "i")}},
            function(err, results){
            if (err) {
                setImmediate(() => { next(new Error(JSON.stringify(err))); });
                return;
            }
            if(results.length > 0 &&
               results[0].id != idUsuario){
                response.status(HttpStatus.BAD_REQUEST).send({message: "Ya existe un usuario con el mismo email"}).end();
                return;
            }
            else {
                // se actualizan los datos del usuario
                UserModel.update({_id: idUsuario}, 
                                 {email: (email != undefined && email.length > 0) ? email : results[0].email,
                                  fechanacimiento: (fechaNacimParsed != undefined) ? fechaNacimParsed : results[0].fechanacimiento,
                                  moneda: (moneda != undefined && moneda.length > 0) ? moneda : results[0].moneda,
                                  nombre: (nombre != undefined && nombre.length > 0) ? nombre : results[0].nombre,
                                  password: (password != undefined && password.length > 0) ? passwordHash.generate(password) : results[0].password}, 
                                 function(err, numberAffected, rawResponse){
                    if (err) {
                        setImmediate(() => { next(new Error(JSON.stringify(err))); });
                        return;
                    }                    
                    response.status(HttpStatus.OK).send().end();
                });           
            }
        });
    } catch(err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});



/**** CONCEPTOS ****************************************************************************************/

//obtiene el total de cada concepto para un mes (YYYYMM) parametrizado para un usuario
apiRoutes.get('/conceptos/mensual/:mes/sumary', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id;
        if (idUsuario === undefined) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        let fecha = request.params.mes;
        if (fecha === undefined ||
            fecha.length != 6 ||
            isNaN(fecha) === true) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Mes invalido"}).end();
            return;
        }

        let mes = Number(fecha.toString().substring(4, 6));
        let anio = Number(fecha.toString().substring(0, 4));

        var resp = new Array();
        let conceptos = ConceptoModel.find({user:idUsuario}).sort('descripcion').cursor();
        for (let doc = await conceptos.next(); doc != null; doc = await conceptos.next()) {
            let foo = {};
            foo['idconcepto'] = doc._id.toString();
            foo['descripcion'] = doc.descripcion;

            var totalconcepto = await MovimientoModel.aggregate(
                [
                    {"$match": {
                        "user": new mongoose.Types.ObjectId(idUsuario),
                        "concepto": new  mongoose.Types.ObjectId(doc._id),
                        "fecha": {$gt: new Date(anio,mes-1,1,0,0,0), $lt: new Date(anio,mes,1,0,0,0)}}
                    },
                    {$group: {
                        _id : "$concepto",
                        importe : { $sum : "$importe" }
                        }
                    }
                ]
            );

            resp.push({idConcepto:doc._id.toString(), descripcion: doc.descripcion, saldo: (totalconcepto.length > 0) ? totalconcepto[0].importe : 0 });
        }
        response.status(HttpStatus.OK).send(resp).end();
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }

});

//obtiene las fechas que un concepto tuvo movimientos YYYYMM para un usuario
apiRoutes.get('/conceptos/:id/movimientos/mensual/:mes', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id;
        if (idUsuario === undefined) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        const idConcepto = request.params.id;
        if (idConcepto === undefined) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id concepto invalido"}).end();
            return;
        }

        const fecha = request.params.mes;
        if (isNaN(fecha) || fecha.length != 6) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Mes invalido"}).end();
            return;
        }

        let mes = Number(fecha.toString().substring(4, 6));
        let anio = Number(fecha.toString().substring(0, 4));

        var resp = new Array();
        
        MovimientoModel.aggregate(
            [
                {"$match": {
                    "user": new  mongoose.Types.ObjectId(idUsuario),
                    "concepto": new  mongoose.Types.ObjectId(idConcepto),
                    "fecha": {$gt: new Date(anio,mes-1,1,0,0,0), $lt: new Date(anio,mes,1,0,0,0)},
                    "importe": {$ne:0}}
                },
                {$group: {
                    _id : "$fecha" ,
                    importe : { $sum : "$importe" }
                    }
                },
                { $sort : { _id : 1 } }
            ],
            function(err, result){
                if (err) {
                    setImmediate(() => { next(new Error(JSON.stringify(err))); });
                    return;
                }
                result.forEach(element => {
                    resp.push({fecha: element._id, importe: element.importe})
                });
                
                response.status(HttpStatus.OK).send(resp).end();
            }
        );
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});

//inseta concepto nuevo para el usuario
apiRoutes.post('/concepto', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id,
            descripcion: string = request.body.descripcion,
            credito = request.body.credito;

        if (idUsuario === undefined) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        if (isNaN(credito) || Number(credito) > 1) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Credito invalido"}).end();
            return;
        }

        if (descripcion == undefined || descripcion.length <= 0) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Descripcion invalida"}).end();
            return;
        }

        // se valida que el no exista un concepto con la misma descripcion
        ConceptoModel.find(
            {user:idUsuario, 
                descripcion:{ $regex : new RegExp(descripcion, "i") }}, 
            function(err, results){
                if (err) {
                    setImmediate(() => { next(new Error(JSON.stringify(err))); });
                    return;
                }
                if(results.length > 0){
                    response.status(HttpStatus.BAD_REQUEST).send({message: "Ya existe concepto con el mismo nombre"}).end();
                    return;
                }
                else{
                    // se agrega el concepto al usuario                
                    let conceptoM = new ConceptoModel({
                        descripcion: descripcion,
                        credito: credito,
                        user: idUsuario
                    });
                    conceptoM.save(function(err){
                        if (err) {
                            setImmediate(() => { next(new Error(JSON.stringify(err))); });
                            return;
                        }
                        else {
                            response.status(HttpStatus.OK).send();
                        }
                    }); 
                }
            }
        );
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});

//actualiza un concepto nuevo para el usuario
apiRoutes.put('/concepto', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id,
            descripcion: string = request.body.descripcion,
            credito = request.body.credito,
            idConcepto = request.body.idconcepto;

        if (idUsuario === undefined) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        if (idConcepto === undefined) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id concepto invalido"}).end();
            return;
        }

        if (isNaN(credito) || Number(credito) > 1) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Credito invalido"}).end();
            return;
        }

        if (descripcion == undefined || descripcion.length <= 0) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Descripcion invalida"}).end();
            return;
        }

        // se valida que exista el concepto y pertenezca al usuario
        ConceptoModel.findById(idConcepto, 
            function(err, results){
                if (err) {
                    setImmediate(() => { next(new Error(JSON.stringify(err))); });
                    return;
                }
                
                // el concepto no existe o no pertenece al usuario
                if (results == null || results.user != idUsuario) {
                    response.status(HttpStatus.BAD_REQUEST).send({message: "El conepto no pertenece al usuario"}).end();
                    return;
                }

                // se valida que no haya otro concepto con el mismo nombre para ese usuario
                ConceptoModel.find(
                    {user:idUsuario, 
                        descripcion: { $regex: new RegExp("^" + descripcion.toLowerCase(), "i")}}, 
                    function(err, results){
                        if (err) {
                            setImmediate(() => { next(new Error(JSON.stringify(err))); });
                            return;
                        }

                        // ya existe otro concepto con el mismo nombre
                        if (results.length > 0 && results[0]._id != idConcepto){
                            response.status(HttpStatus.BAD_REQUEST).send({message: "Ya existe otro concepto con el mismo nombre"}).end();
                            return;
                        }

                        ConceptoModel.update(
                            {_id:idConcepto}, 
                            {descripcion: descripcion,
                             credito:credito},
                            function(err, results){
                                if (err) {
                                    setImmediate(() => { next(new Error(JSON.stringify(err))); });
                                    return;
                                }

                                response.status(HttpStatus.OK).send().end();
                            }
                        );
                    }
                );
            }
        );
    } catch(err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});

//obtiene el total de cada concepto para un anio parametrizado para un usuario
apiRoutes.get('/conceptos/anual/:anio/sumary', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id;
        if (idUsuario === undefined) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        let anio = request.params.anio;
        if (isNaN(anio) === true) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Anio invalido"}).end();
            return;
        }

        var resp = new Array();
        let conceptos = ConceptoModel.find({user:idUsuario}).sort('descripcion').cursor();
        for (let doc = await conceptos.next(); doc != null; doc = await conceptos.next()) {
            let foo = {};
            foo['idconcepto'] = doc._id.toString();
            foo['descripcion'] = doc.descripcion;

            var totalconcepto = await MovimientoModel.aggregate(
                [
                    {"$match": {
                        "user": new  mongoose.Types.ObjectId(idUsuario),
                        "concepto": new  mongoose.Types.ObjectId(doc._id),
                        "fecha": {$gt: new Date(Number(anio),0,1,0,0,0), $lt: new Date(Number(anio),11,31,23,59,59)}}
                    },
                    {$group: {
                        _id : "$concepto",
                        importe : { $sum : "$importe" }
                        }
                    }
                ]
            );

            resp.push({idConcepto:doc._id.toString(), descripcion: doc.descripcion, saldo: (totalconcepto.length > 0) ? totalconcepto[0].importe : 0 });
        }
        response.status(HttpStatus.OK).send(resp).end();
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }

});

//obtiene los meses que un concepto tuvo movimientos YYYY para un usuario
apiRoutes.get('/conceptos/:id/movimientos/anual/:anio', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id;
        if (idUsuario === undefined) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        const idConcepto = request.params.id;
        if (idConcepto === undefined) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id concepto invalido"}).end();
            return;
        }

        const anio = request.params.anio;
        if (isNaN(anio)) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Anio invalido"}).end();
            return;
        }

        var resp = new Array();
        
        MovimientoModel.aggregate(
            [
                {"$match": {
                    "user": new  mongoose.Types.ObjectId(idUsuario),
                    "concepto": new  mongoose.Types.ObjectId(idConcepto),
                    "fecha": {$gt: new Date(Number(anio),0,1,0,0,0), $lt: new Date(Number(anio),11,31,23,59,59)},
                    "importe": {$ne:0}}
                },
                {$group: {
                    _id : { $month : "$fecha" } ,
                    importe : { $sum : "$importe" }
                    }
                },
                { $sort : { _id : 1 } }
            ],
            function(err, result){
                if (err) {
                    setImmediate(() => { next(new Error(JSON.stringify(err))); });
                    return;
                }
                result.forEach(element => {
                    resp.push({mes: element._id.toString().padStart(2, '0') + anio, importe: element.importe})
                });
                
                response.status(HttpStatus.OK).send(resp).end();
            }
        );
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});

//obtiene el total de cada concepto en la historia de un usuario
apiRoutes.get('/conceptos/historico/sumary', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id;
        if (idUsuario === undefined) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        var resp = new Array();
        let conceptos = ConceptoModel.find({user:idUsuario}).sort('descripcion').cursor();
        for (let doc = await conceptos.next(); doc != null; doc = await conceptos.next()) {
            let foo = {};
            foo['idconcepto'] = doc._id.toString();
            foo['descripcion'] = doc.descripcion;

            var totalconcepto = await MovimientoModel.aggregate(
                [
                    {"$match": {
                        "user": new  mongoose.Types.ObjectId(idUsuario),
                        "concepto": new  mongoose.Types.ObjectId(doc._id)}
                    },
                    {$group: {
                        _id : "$concepto",
                        importe : { $sum : "$importe" }
                        }
                    }
                ]
            );

            resp.push({idConcepto:doc._id.toString(), descripcion: doc.descripcion, saldo: (totalconcepto.length > 0) ? totalconcepto[0].importe : 0 });
        }
        response.status(HttpStatus.OK).send(resp).end();
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }

});

//obtiene los anios que un concepto tuvo movimientos para un usuario
apiRoutes.get('/conceptos/:id/movimientos/historico', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id;
        if (idUsuario === undefined) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        const idConcepto = request.params.id;
        if (idConcepto === undefined) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id concepto invalido"}).end();
            return;
        }

        var resp = new Array();
        
        MovimientoModel.aggregate(
            [
                {"$match": {
                    "user": new  mongoose.Types.ObjectId(idUsuario),
                    "concepto": new  mongoose.Types.ObjectId(idConcepto),
                    "importe": {$ne:0}}
                },
                {$group: {
                    _id : { $year : "$fecha" } ,
                    importe : { $sum : "$importe" }
                    }
                },
                { $sort : { _id : 1 } }
            ],
            function(err, result){
                if (err) {
                    setImmediate(() => { next(new Error(JSON.stringify(err))); });
                    return;
                }
                result.forEach(element => {
                    resp.push({anio: element._id, importe: element.importe})
                });
                
                response.status(HttpStatus.OK).send(resp).end();
            }
        );
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});



/**** MENSUAL ******************************************************************************************/

//obtiene el total mensual de un usuario para una fecha YYYYMM
apiRoutes.get('/mensual/:fecha/sumary', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id;
        if (idUsuario === undefined) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        // YYYYMM
        let fecha = request.params.fecha;
        if (isNaN(fecha) ||
            fecha.length != 6) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Fecha invalida"}).end();
            return;
        }
        
        let anio = Number(fecha.substring(0, 4));
        let mes = Number(fecha.substring(4, 6));

        let fechadesde = new Date(anio,mes-1,1,0,0,0);
        let fechahasta = new Date(anio,mes,1,0,0,0);

        let resp = {};
        
        // obtengo el total de ingresos
        MovimientoModel.aggregate(
            [
                {"$match": {
                    "user": new  mongoose.Types.ObjectId(idUsuario), 
                    "importe":{$gt:0},
                    "fecha": {$gt:fechadesde, $lt: fechahasta}}
                },
                {$group: {_id: '$user', ingresos: {$sum: "$importe"}}}
            ], 
            function(err, result){
            if (err) {
                setImmediate(() => { next(new Error(JSON.stringify(err))); });
                return;
            }

            resp['ingresos'] = (result[0] !== undefined) ? result[0].ingresos : 0;

            // obtengo el total de egresos
            MovimientoModel.aggregate(
                [
                    {"$match": {
                        "user": new  mongoose.Types.ObjectId(idUsuario), 
                        "importe":{$lt:0},
                        "fecha": {$gt:fechadesde, $lt: fechahasta}}
                    },
                    {$group: {_id: '$user', egresos: {$sum: "$importe"}}}
                ], 
                function(err, result){
                if (err) {
                    setImmediate(() => { next(new Error(JSON.stringify(err))); });
                    return;
                }

                resp['egresos'] = (result[0] !== undefined) ? Math.abs(result[0].egresos) : 0;
                response.status(HttpStatus.OK).send(resp).end();
            });
        });
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});


/**** ANUAL ******************************************************************************************/

//obtiene el total anual de un usuario para una fecha YYYY
apiRoutes.get('/anual/:fecha/sumary', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id;
        if (idUsuario === undefined) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        let fecha = request.params.fecha;
        if (isNaN(fecha) ||
            fecha.length != 4) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Año invalido"}).end();
            return;
        }

        let resp = {};
        
        // obtengo el total de ingresos
        MovimientoModel.aggregate(
            [
                {"$match": {
                    "user": new  mongoose.Types.ObjectId(idUsuario), 
                    "importe":{$gt:0},
                    "fecha": {$gt: new Date(Number(fecha),0,1,0,0,0), $lt: new Date(Number(fecha),11,31,23,59,59)}}
                },
                {$group: {_id: '$user', ingresos: {$sum: "$importe"}}}
            ], 
            function(err, result){
            if (err) {
                setImmediate(() => { next(new Error(JSON.stringify(err))); });
                return;
            }

            resp['ingresos'] = (result[0] !== undefined) ? result[0].ingresos : 0;

            // obtengo el total de egresos
            MovimientoModel.aggregate(
                [
                    {"$match": {
                        "user": new  mongoose.Types.ObjectId(idUsuario), 
                        "importe":{$lt:0},
                        "fecha": {$gt: new Date(Number(fecha),1,1,0,0,0), $lt: new Date(Number(fecha),12,31,23,59,59)}}
                    },
                    {$group: {_id: '$user', egresos: {$sum: "$importe"}}}
                ], 
                function(err, result){
                if (err) {
                    setImmediate(() => { next(new Error(JSON.stringify(err))); });
                    return;
                }

                resp['egresos'] = (result[0] !== undefined) ? Math.abs(result[0].egresos) : 0;
                response.status(HttpStatus.OK).send(resp).end();
            });
        });
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});


/**** HISTORICO ******************************************************************************************/

//obtiene el total historico de un usuario
apiRoutes.get('/historico/sumary', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id;
        if (idUsuario === undefined) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        let resp = {};

        // obtengo el total de ingresos
        MovimientoModel.aggregate(
            [
                {"$match": {"user": new  mongoose.Types.ObjectId(idUsuario), "importe":{$gt:0}}},
                {$group: {_id: '$user', ingresos: {$sum: "$importe"}}}
            ], 
            function(err, result){
            if (err) {
                setImmediate(() => { next(new Error(JSON.stringify(err))); });
                return;
            }

            resp['ingresos'] = (result[0] !== undefined) ? result[0].ingresos : 0;

            // obtengo el total de egresos
            MovimientoModel.aggregate(
                [
                    {"$match": {"user": new  mongoose.Types.ObjectId(idUsuario), "importe":{$lt:0}}},
                    {$group: {_id: '$user', egresos: {$sum: "$importe"}}}
                ], 
                function(err, result){
                if (err) {
                    setImmediate(() => { next(new Error(JSON.stringify(err))); });
                    return;
                }

                resp['egresos'] = (result[0] !== undefined) ? Math.abs(result[0].egresos) : 0;
                response.status(HttpStatus.OK).send(resp).end();
            });
        });
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});


/**** DIARIO *******************************************************************************************/

//insera o actualiza un item diario para un usuario
apiRoutes.post('/diario', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id,
            fecha: string = request.body.fecha,
            importe = request.body.importe,
            idConcepto = request.body.idConcepto;

        if (idUsuario === undefined) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        if (isNaN(importe)) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Importe invalido"}).end();
            return;
        }

        if (idConcepto === undefined) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id concepto invalido"}).end();
            return;
        }

        if (fecha.length !== 8) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Fecha invalida"}).end();
            return;
        }

        let fechaParam: Date = new Date(
                            Number(fecha.substring(0, 4)), 
                            Number(fecha.substring(4, 6))-1, 
                            Number(fecha.substring(6, 8))+1, 
                            0, 0, 0, 0);
        fechaParam.setUTCHours(0, 0, 0, 1);

        // se busca el concepto para el cual se va a cargar el movimiento
        ConceptoModel.findById(idConcepto, 
            function(err, results){
                if (err) {
                    setImmediate(() => { next(new Error(JSON.stringify(err))); });
                    return;
                }
                
                // el concepto no existe o no pertenece al usuario
                if (results == null || results.user != idUsuario) {
                    response.status(HttpStatus.BAD_REQUEST).send({message: "El conepto no pertenece al usuario"}).end();
                    return;
                }

                // se busca el movimiento para la fecha solicitada
                MovimientoModel.findOne(
                    {concepto: idConcepto, 
                        fecha: {$gt: new Date(fechaParam.getFullYear(),fechaParam.getMonth(),fechaParam.getDate(),0,0,0), $lt: new Date(fechaParam.getFullYear(),fechaParam.getMonth(),fechaParam.getDate(),23,59,59)}}, 
                    function(err, results){
                        if (err) {
                            setImmediate(() => { next(new Error(JSON.stringify(err))); });
                            return;
                        }
                        
                        // no existe un movimiento cargado para la fecha solicitada, hay que hacer un insert
                        if (results == null) {
                            let movimientoM = new MovimientoModel({
                                user: idUsuario,
                                concepto: idConcepto,
                                fecha: fechaParam,
                                importe: importe
                            });
                            movimientoM.save(function(err){
                                if (err) {
                                    setImmediate(() => { next(new Error(JSON.stringify(err))); });
                                    return;
                                }
                                else {
                                    response.status(HttpStatus.OK).send();
                                }
                            });                             
                        }
                        else{
                            // ya existe el movimiento para la fecha solicitada, se actualiza
                            MovimientoModel.update(
                                {_id:results._id},
                                {importe:importe,
                                 fechaalta: new Date()},
                                function(err, results){
                                    if (err) {
                                        setImmediate(() => { next(new Error(JSON.stringify(err))); });
                                        return;
                                    }

                                    response.status(HttpStatus.OK).send();
                                }
                            );                            
                        }            
                    }
                ); 
            }
        ); 
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});

//obtiene el primer consumo del usuario
apiRoutes.get('/diario/first', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id;
        if (idUsuario === undefined) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        var fechaMax = null;
        var fechaMin = null;

        // busca el max de fecha
        MovimientoModel.findOne()
            .where({user:idUsuario})
            .sort('-fecha')
            .exec(function(err, result)
            {
                if (err) {
                    setImmediate(() => { next(new Error(JSON.stringify(err))); });
                    return;
                }

                fechaMax = result.fecha;

                // busca el min de fecha
                MovimientoModel.findOne()
                    .where({user:idUsuario})
                    .sort('fecha')
                    .exec(function(err, result)
                    {
                        if (err) {
                            setImmediate(() => { next(new Error(JSON.stringify(err))); });
                            return;
                        }

                        fechaMin = result.fecha;                    
                        response.status(HttpStatus.OK).send({fechaMin: fechaMin, fechaMax: fechaMax}).end();
                    }
                );
            }
        );
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});

//obtiene todos los gastos diarios de un usuario para una fecha
apiRoutes.get('/diario/:fecha', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id;
        if (idUsuario === undefined) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        let fecha = request.params.fecha;
        if (fecha === undefined ||
            fecha.length != 8) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Fecha invalida"}).end();
            return;
        }

        let fechaParam: Date = new Date(
                                    Number(fecha.substring(0, 4)), 
                                    Number(fecha.substring(4, 6))-1, 
                                    Number(fecha.substring(6, 8))+1, 
                                    0, 0, 0, 0);
        fechaParam.setUTCHours(0, 0, 0, 0);

        /*console.log(new Date(fechaParam.getFullYear(),fechaParam.getMonth(),fechaParam.getDate(),0,0,0));
        console.log(new Date(fechaParam.getFullYear(),fechaParam.getMonth(),fechaParam.getDate(),23,59,59));*/

        var resp = new Array();
        let conceptos = ConceptoModel.find({user:idUsuario}).sort('descripcion').cursor();
        for (let doc = await conceptos.next(); doc != null; doc = await conceptos.next()) {
            let foo = {};
            foo['idconcepto'] = doc._id.toString();
            foo['descripcion'] = doc.descripcion;
            foo['credito'] = doc.credito;
            
            let movimiento = MovimientoModel.find(
                {concepto:doc._id, 
                 fecha: {$gt: new Date(fechaParam.getFullYear(),fechaParam.getMonth(),fechaParam.getDate(),0,0,0), $lt: new Date(fechaParam.getFullYear(),fechaParam.getMonth(),fechaParam.getDate(),23,59,59)}}).cursor();

            for (let mov = await movimiento.next(); mov != null; mov = await movimiento.next()) {
                foo['fecha'] = mov.fecha;
                foo['importe'] = mov.importe;
            }

            // el concepto no tiene movimientos
            if(foo['importe'] === undefined){
                foo['fecha'] = fechaParam;
                foo['importe'] = 0;
            }
            
            resp.push(foo);            
        }

        response.status(HttpStatus.OK).send(resp).end();
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});


/********************************************************************************************************/


// la aplicacion va a usar las rutas previamete seteadas
app.use('/api', apiRoutes);
logger.info({message: "set api routes ok"});
logger.info({message: "expiracion AT: " + config.app.expiraciontoken});
logger.info({message: "max intentos fallidos login: " + config.app.intentosfallidoslogin});

// global error handler
app.use(function(err, req, res, next) {
    
    let errorId = uuid.v4();
    res.status(500).send({errorId: errorId});
    
    // se loguea el error
    logger.error({errorId: errorId, message: err});
});

logger.info({message: "init ok"});
app.listen(config.app.port);



/***************************** MIGRATION *******************************/
/*
// se migran los usuarios
apiRoutes.post('/usuarios/migration', async (request, response, next) => {
    
    try {
        let user1 = new UserModel({
            email: "flopyglorias@gmail.com",
            nombre: "Flor",
            fechanacimiento: "1986-12-27 00:00:00",
            idestado: 0,
            moneda: "€",
            password: "sha1$0aba42ea$1$ffb674911b122a75a8721d1bd47c54a28670acb5"
        });
        user1.save(function(err){
            if (err) {
                setImmediate(() => { next(new Error(JSON.stringify(err))); });
                return;
            }
            else {
                response.status(HttpStatus.OK).send();
            }
        });

        let user2 = new UserModel({
            email: "joseluiseiguren@gmail.com",
            nombre: "Joseph",
            fechanacimiento: "1980-05-13 00:00:00",
            idestado: 0,
            moneda: "$",
            password: "sha1$790e9674$1$4afb8e2b92a59dd3f25e25c088e5b9a90d9af4c3"
        });
        user2.save(function(err){
            if (err) {
                setImmediate(() => { next(new Error(JSON.stringify(err))); });
                return;
            }
            else {
                response.status(HttpStatus.OK).send();
            }
        });

        let user3 = new UserModel({
            email: "fernanda.eiguren@gmail.com",
            nombre: "Fernanda Eiguren",
            fechanacimiento: "1988-05-13 00:00:00",
            idestado: 0,
            moneda: "$",
            password: "sha1$a53c3e8c$1$479923b420203b70ed2a71a18426119aa00c4822"
        });
        user3.save(function(err){
            if (err) {
                setImmediate(() => { next(new Error(JSON.stringify(err))); });
                return;
            }
            else {
                response.status(HttpStatus.OK).send();
            }
        });
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});

// se migran los conceptos
apiRoutes.post('/conceptos/migration/', async (request, response, next) => {
    
    try {
        let idUsuario = "5ad1ce4cbefd252f74b413cb";
        let conceptos = new Array();

        // flor 
        conceptos.push({descripcion: 'Suedo', credito: 1});
        conceptos.push({descripcion: 'Supermercado', credito: 0});
        conceptos.push({descripcion: 'Perros', credito: 0});
        conceptos.push({descripcion: 'Viajes Work',credito: 0});
        conceptos.push({descripcion: 'Comida Work',credito: 0});
        conceptos.push({descripcion: 'Gym', credito: 0});
        conceptos.push({descripcion: 'Beauty', credito: 0});
        conceptos.push({descripcion: 'Salidas', credito: 0});
        conceptos.push({descripcion: 'Ahorro', credito: 1});
        conceptos.push({descripcion: 'Alquiler', credito: 0});
        conceptos.push({descripcion: 'Orange', credito: 0});
        conceptos.push({descripcion: 'Luz', credito: 0});
        conceptos.push({descripcion: 'Gas', credito: 0});
        conceptos.push({descripcion: 'Agua', credito: 0});
        conceptos.push({descripcion: 'Seguros', credito: 0});
        conceptos.push({descripcion: 'Odontólogo', credito: 0});
        conceptos.push({descripcion: 'Cursos', credito: 0});
        conceptos.push({descripcion: 'Salud', credito: 0});
        conceptos.push({descripcion: 'Reposteria', credito: 0});
        conceptos.push({descripcion: 'Deco Casa',credito:  0});
        conceptos.push({descripcion: 'Ajuste', credito: 1});
        conceptos.push({descripcion: 'Varios', credito: 0});
        conceptos.push({descripcion: 'Viajes Mundo',credito: 0});
        conceptos.push({descripcion: 'Look', credito: 0});
        
        //joseph
        conceptos.push({descripcion: 'Plazo Fijo', credito: 1});
        conceptos.push({descripcion: 'Varios', credito: 0});
        conceptos.push({descripcion: 'Haras', credito: 0});
        conceptos.push({descripcion: 'Ahorros Arg', credito: 1});
        conceptos.push({descripcion: 'Netflix', credito: 0});
        conceptos.push({descripcion: 'Venta Muebles', credito: 1});
        conceptos.push({descripcion: 'Pluralsight', credito: 0});
        conceptos.push({descripcion: 'Tarjeta flor', credito: 0});
        
        //maria
        conceptos.push({descripcion: 'Suedo', credito: 1});
        

        conceptos.forEach(element => {
            let concepto1 = new ConceptoModel({
                descripcion: element.descripcion,
                credito: element.credito,
                user: idUsuario
            });
            concepto1.save(function(err){
                if (err) {
                    setImmediate(() => { next(new Error(JSON.stringify(err))); });
                    return;
                }
                else {
                    response.status(HttpStatus.OK).send();
                }
            });
        });
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});

// se migran los movimientos
apiRoutes.post('/movimientos/migration/', async (request, response, next) => {
    
    try {
        let idUsuario = "5ad1ce4cbefd252f74b413cb";
        let idConcepto = "5ad1d09c922a5e05dc0f8c5a";
        let movimientos = new Array();

        
        movimientos.push({fecha: '2018-03-18 02:00:00', importe: '20000.00'});



        movimientos.forEach(element => {
            let movimientoM = new MovimientoModel({
                user: idUsuario,
                concepto: idConcepto,
                fecha: element.fecha,
                importe: element.importe
            });
            movimientoM.save(function(err){
                if (err) {
                    setImmediate(() => { next(new Error(JSON.stringify(err))); });
                    return;
                }
                else {
                    response.status(HttpStatus.OK).send();
                }
            });          
        });                
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});
*/