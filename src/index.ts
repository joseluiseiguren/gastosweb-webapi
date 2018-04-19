import "reflect-metadata";
import { user } from "./app.models/user.app.model";
import { audit } from "./app.models/audit.app.model";
import { concepto } from "./app.models/concepto.app.model";
import { movimiento } from "./app.models/movimiento.app.model";

//mongodb repositories
import { movimientoRepositoryMongo } from "./mongo.repositories/movimiento.mongo.repository";
import { userRepositoryMongo } from "./mongo.repositories/user.mongo.repository";
import { conceptoRepositoryMongo } from "./mongo.repositories/concepto.mongo.repository";
import { auditRepositoryMongo } from "./mongo.repositories/audit.mongo.repository";

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

let app = express();
app.use(cors())
app.use(bodyParser.json());
app.set('jwtsecret', config.secrethash.key);

var apiRoutes = express.Router();
const TIPOOPERACION = Object.freeze({LOGINOK: 1, LOGINDENIED: 2});
const USUARIOSESTADOS = Object.freeze({NORMAL: 0, BLOQUEADO: 1});

// The only place where we define the repositories to use in the app
var reporitoryUser = new userRepositoryMongo();
var reporitoryConcepto = new conceptoRepositoryMongo();
var reporitoryAuditoria = new auditRepositoryMongo();
var reporitoryMovimiento = new movimientoRepositoryMongo();


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
            
            let auditoria = new audit({idusuario:"", observacion:JSON.stringify(responseMessage), aditionalinfo:JSON.stringify(request.body), tipooperacion:TIPOOPERACION.LOGINDENIED, location:location});            
            await reporitoryAuditoria.Insert(auditoria);
            return;
        }

        // se obtiene el usuario via email
        let result = await reporitoryUser.GetByFilter(email);
        if(result.length <= 0){
            let responseMessage = {message: "Usuario Inexistente"};
            response.status(HttpStatus.UNAUTHORIZED).send(responseMessage).end();

            let auditoria = new audit({idusuario:"", observacion:JSON.stringify(responseMessage), aditionalinfo:JSON.stringify(request.body), tipooperacion:TIPOOPERACION.LOGINDENIED, location:location});            
            await reporitoryAuditoria.Insert(auditoria);
            return;
        }
        
        let usuario = result[0];

        // se valida que el usuairo no este bloqueado
        if (usuario.idestado === USUARIOSESTADOS.BLOQUEADO) {
            let responseMessage = {message: "Usuario Bloqueado"};
            response.status(HttpStatus.UNAUTHORIZED).send(responseMessage).end();
            
            let auditoria = new audit({idusuario:usuario._id, observacion:JSON.stringify(responseMessage), aditionalinfo:JSON.stringify(request.body), tipooperacion:TIPOOPERACION.LOGINDENIED, location:location});            
            await reporitoryAuditoria.Insert(auditoria);
            return;
        }

        // se valida el password
        if (passwordHash.verify(password, usuario.password) === false) {
                    
            usuario.intentosfallidoslogin++;
            
            // se bloquea el usuario
            if (usuario.intentosfallidoslogin == config.app.intentosfallidoslogin*1) {
                usuario.idestado = USUARIOSESTADOS.BLOQUEADO;
            }

            // se actualiza el usuario
            await reporitoryUser.Update(usuario);

            let responseMessage = {message: "Password Invalido"};
            response.status(HttpStatus.UNAUTHORIZED).send(responseMessage).end();
            
            let auditoria = new audit({idusuario:usuario._id, observacion:JSON.stringify(responseMessage), aditionalinfo:JSON.stringify(request.body), tipooperacion:TIPOOPERACION.LOGINDENIED, location:location});            
            await reporitoryAuditoria.Insert(auditoria);
            return;
        }

        // se actualizan los intentos fallidos del usuario a cero
        usuario.intentosfallidoslogin = 0;
        await reporitoryUser.Update(usuario);

        const payload = {
            user: usuario.nombre,
            id: usuario._id,
            moneda: usuario.moneda, 
        };

        //var token = jwt.sign(payload, app.get('jwtsecret'), { expiresIn : 60*60*24 });
        var token = jwt.sign(payload, app.get('jwtsecret'), { expiresIn : config.app.expiraciontoken*1 });

        response.status(HttpStatus.OK).send({token: token});
        
        let auditoria = new audit({idusuario:usuario._id, observacion:"", aditionalinfo:"", tipooperacion:TIPOOPERACION.LOGINOK, location:location});            
        await reporitoryAuditoria.Insert(auditoria);
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

        let fechaParam: Date = new Date();
        fechaParam.setFullYear(Number(fechanacimiento.substring(0, 4)));
        fechaParam.setUTCMonth(Number(fechanacimiento.substring(4, 6))-1);
        fechaParam.setUTCDate(Number(fechanacimiento.substring(6, 8)));
        fechaParam.setUTCHours(0);
        fechaParam.setUTCMinutes(0);
        fechaParam.setUTCSeconds(0);
        fechaParam.setUTCMilliseconds(0);

        // valida que el usuario no exista
        let result = await reporitoryUser.GetByFilter(email);
        if(result.length > 0){
            response.status(HttpStatus.BAD_REQUEST).send({message: "Ya existe un usuario con el mismo email"}).end();
            return;
        }

        // se hashea el password
        let hashedPassword = passwordHash.generate(password);

        let usuario = new user();
        usuario.email = email;
        usuario.nombre = nombre;
        usuario.fechanacimiento = fechaParam;
        usuario.moneda = moneda;
        usuario.password = hashedPassword;
        
        await reporitoryUser.Insert(usuario);

        response.status(HttpStatus.OK).send();             
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
        let result = await reporitoryUser.GetByFilter(request.query.email);
        response.status(HttpStatus.OK).send(result).end();
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

        let conceptos = await reporitoryConcepto.GetByFilter(idUsuario, undefined, undefined);
        response.status(HttpStatus.OK).send(conceptos).end();        
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

        let usuario = await reporitoryUser.GetById(id);
        response.status(HttpStatus.OK).send(usuario).end();
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
            fechaNacimParsed = new Date();
            fechaNacimParsed.setFullYear(Number(fechanacimiento.substring(0, 4)));
            fechaNacimParsed.setUTCMonth(Number(fechanacimiento.substring(4, 6))-1);
            fechaNacimParsed.setUTCDate(Number(fechanacimiento.substring(6, 8)));
            fechaNacimParsed.setUTCHours(0);
            fechaNacimParsed.setUTCMinutes(0);
            fechaNacimParsed.setUTCSeconds(0);
            fechaNacimParsed.setUTCMilliseconds(0);
        }

        // se obtiene el usuario via email
        let result = await reporitoryUser.GetByFilter(email);
        if(result.length > 0 &&
            result[0]._id != idUsuario){
             response.status(HttpStatus.BAD_REQUEST).send({message: "Ya existe un usuario con el mismo email"}).end();
             return;
         }

         let usuario = result[0];

         // se actualizan los datos del usuario
         usuario.email = (email != undefined && email.length > 0) ? email : usuario.email,
         usuario.fechanacimiento = (fechaNacimParsed != undefined) ? fechaNacimParsed : usuario.fechanacimiento,
         usuario.moneda = (moneda != undefined && moneda.length > 0) ? moneda : usuario.moneda,
         usuario.nombre = (nombre != undefined && nombre.length > 0) ? nombre : usuario.nombre,
         usuario.password = (password != undefined && password.length > 0) ? passwordHash.generate(password) : usuario.password;
        
         await reporitoryUser.Update(usuario);

         response.status(HttpStatus.OK).send().end();
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

        let conceptosSumary = await reporitoryConcepto.GetMensualSumary(idUsuario, anio, mes);
        response.status(HttpStatus.OK).send(conceptosSumary).end();
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }

});

//obtiene los dias que un concepto tuvo movimientos YYYYMM para un usuario
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

        let conceptosMovimientos = await reporitoryConcepto.GetMensualByConcept(idUsuario, idConcepto, anio, mes);
        response.status(HttpStatus.OK).send(conceptosMovimientos).end();
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
        let conceptos = await reporitoryConcepto.GetByFilter(idUsuario, descripcion, undefined);
        if(conceptos.length > 0){
            response.status(HttpStatus.BAD_REQUEST).send({message: "Ya existe concepto con el mismo nombre"}).end();
            return;
        }

        // se agrega el concepto al usuario                
        let cnp = new concepto();
        cnp.user = idUsuario;
        cnp.descripcion = descripcion;
        cnp.credito = credito;
        
        await reporitoryConcepto.Insert(cnp);
        response.status(HttpStatus.OK).send();
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
        let conceptos = await reporitoryConcepto.GetByFilter(idUsuario, undefined, idConcepto);

        // el concepto no existe o no pertenece al usuario
        if (conceptos.length <= 0) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "El conepto no pertenece al usuario"}).end();
            return;
        }

        // se valida que no haya otro concepto con el mismo nombre para ese usuario
        conceptos = await reporitoryConcepto.GetByFilter(idUsuario, descripcion, undefined);
        
        // ya existe otro concepto con el mismo nombre
        if (conceptos.length > 0 && conceptos[0]._id != idConcepto){
            response.status(HttpStatus.BAD_REQUEST).send({message: "Ya existe otro concepto con el mismo nombre"}).end();
            return;
        }

        // se actualiza el concepto
        let cnp: concepto = new concepto();
        cnp._id = idConcepto;
        cnp.credito = credito;
        cnp.descripcion = descripcion;
        cnp.user = idUsuario;
        await reporitoryConcepto.Update(cnp);

        response.status(HttpStatus.OK).send().end();
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

        let conceptosSumary = await reporitoryConcepto.GetAnualSumary(idUsuario, anio);
        response.status(HttpStatus.OK).send(conceptosSumary).end();

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

        let conceptosMovimientos = await reporitoryConcepto.GetAnualByConcept(idUsuario, idConcepto, anio);
        response.status(HttpStatus.OK).send(conceptosMovimientos).end();

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

        let conceptosSumary = await reporitoryConcepto.GetHistoricoSumary(idUsuario);
        response.status(HttpStatus.OK).send(conceptosSumary).end();
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

        let conceptosMovimientos = await reporitoryConcepto.GetHistoricoByConcept(idUsuario, idConcepto);
        response.status(HttpStatus.OK).send(conceptosMovimientos).end();

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

        let mes = Number(fecha.toString().substring(4, 6));
        let anio = Number(fecha.toString().substring(0, 4));

        let sumary = await reporitoryMovimiento.GetMensualSumary(idUsuario, anio, mes);
        response.status(HttpStatus.OK).send(sumary).end();
         
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

        let anio = request.params.fecha;
        if (isNaN(anio) ||
            anio.length != 4) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Año invalido"}).end();
            return;
        }

        let sumary = await reporitoryMovimiento.GetAnualSumary(idUsuario, anio);
        response.status(HttpStatus.OK).send(sumary).end();

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

        let sumary = await reporitoryMovimiento.GetHistoricoSumary(idUsuario);
        response.status(HttpStatus.OK).send(sumary).end();
       
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

        // se valida que exista el concepto y pertenezca al usuario
        let conceptos = await reporitoryConcepto.GetByFilter(idUsuario, undefined, idConcepto);

        // el concepto no existe o no pertenece al usuario
        if (conceptos.length <= 0) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "El conepto no pertenece al usuario"}).end();
            return;
        }

        let fechaMov: Date = new Date();
        fechaMov.setFullYear(Number(fecha.substring(0, 4)));
        fechaMov.setUTCMonth(Number(fecha.substring(4, 6))-1);
        fechaMov.setUTCDate(Number(fecha.substring(6, 8)));
        fechaMov.setUTCHours(0);
        fechaMov.setUTCMinutes(0);
        fechaMov.setUTCSeconds(0);
        fechaMov.setUTCMilliseconds(0);

        let fechaHasta: Date = new Date();
        fechaHasta.setFullYear(Number(fecha.substring(0, 4)));
        fechaHasta.setUTCMonth(Number(fecha.substring(4, 6))-1);
        fechaHasta.setUTCDate(Number(fecha.substring(6, 8)));
        fechaHasta.setUTCHours(23);
        fechaHasta.setUTCMinutes(59);
        fechaHasta.setUTCSeconds(59);
        fechaHasta.setUTCMilliseconds(0);

        // se busca el movimiento para la fecha solicitada
        let existeMov = await reporitoryMovimiento.GetByFilter(idUsuario, idConcepto, fechaMov, fechaHasta);

        // no existe un movimiento cargado para la fecha solicitada, hay que hacer un insert
        if (existeMov.length <= 0){
            let mov: movimiento = new movimiento();
            mov.concepto = idConcepto;
            mov.fecha = fechaMov;
            mov.importe = importe;
            mov.user = idUsuario;
            await reporitoryMovimiento.Insert(mov);
        } else {
            // ya existe el movimiento para la fecha solicitada, se actualiza
            let mov: movimiento = new movimiento();
            mov.concepto = idConcepto;
            mov.fecha = fechaMov;
            mov.importe = importe;
            mov.user = idUsuario;
            mov._id = existeMov[0]._id;
            await reporitoryMovimiento.Update(mov);
        }

        response.status(HttpStatus.OK).send();

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

        let result = await reporitoryMovimiento.GetFirstLast(idUsuario);
        response.status(HttpStatus.OK).send(result).end();

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

        let anio = Number(fecha.substring(0, 4));
        let mes = Number(fecha.substring(4, 6));
        let dia = Number(fecha.substring(6, 8));

        let result = await reporitoryConcepto.GetDiarioSumary(idUsuario, anio, mes, dia);
        response.status(HttpStatus.OK).send(result).end();

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

app.listen(config.app.port);
logger.info({message: "Fecha Server: " + new Date()});
logger.info({message: "App iniciada..."});
