import "reflect-metadata";
import { createConnection, Connection, getConnectionManager} from "typeorm";
import { Usuarios } from "./entity/Usuarios";
import { Conceptos } from "./entity/Conceptos";
import { UsuarioRepository } from "./repositorios/UsuariosRepository";
import { ConceptosRepository } from "./repositorios/ConceptosRepository";
import { DiarioRepository } from "./repositorios/DiarioRepository";
import { Diario } from "./entity/Diarios";
import { MensualRepository } from "./repositorios/MensualRepository";
import { AnualRepository } from "./repositorios/AnualRepository";
import { HistoricoRepository } from "./repositorios/HistoricoRepository";
import { Audit } from "./entity/Audit";
import { AuditRepository } from "./repositorios/AuditRepository";
import { SaveAudit } from "./repositorios/DbConection";

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
            process.env.DEV_DB_HOST === undefined ||
            process.env.DEV_DB_PORT === undefined ||
            process.env.DEV_DB_NAME === undefined ||
            process.env.DEV_DB_USER === undefined ||
            process.env.DEV_DB_PASSWORD === undefined ||
            process.env.DEV_SECRETHASH === undefined){
                logger.error({errorId: 1, message: "Variables de entorno de DEV no seteadas"});
                process.exit(1);
            }            
        break;

    case "production":
        logger.info({message: "Working in Prod"});
        if (process.env.PROD_APP_PORT === undefined ||
            process.env.PROD_DB_HOST === undefined ||
            process.env.PROD_DB_PORT === undefined ||
            process.env.PROD_DB_NAME === undefined ||
            process.env.PROD_DB_USER === undefined ||
            process.env.PROD_DB_PASSWORD === undefined ||
            process.env.PROD_SECRETHASH === undefined){
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
            SaveAudit(0, JSON.stringify(responseMessage), JSON.stringify(request.body), TIPOOPERACION.LOGINDENIED, location);
            return;
        }

        // se obtiene el usuario via email
        let repo = new UsuarioRepository();
        let users = await repo.GetByFilter(email);

        // usuario inexistente
        if (users.length <= 0) {
            let responseMessage = {message: "Usuario Inexistente"};
            response.status(HttpStatus.UNAUTHORIZED).send(responseMessage).end();
            SaveAudit(0, JSON.stringify(responseMessage), JSON.stringify(request.body), TIPOOPERACION.LOGINDENIED, location);
            return;
        }

        // se valida el password
        if (passwordHash.verify(password, users[0].password) === false) {
            let responseMessage = {message: "Password Invalido"};
            response.status(HttpStatus.UNAUTHORIZED).send(responseMessage).end();
            SaveAudit(0, JSON.stringify(responseMessage), JSON.stringify(request.body), TIPOOPERACION.LOGINDENIED, location);
            return;
        }

        const payload = {
            user: users[0].nombre,
            id: users[0].id,
            moneda: users[0].moneda, 
        };

        var token = jwt.sign(payload, app.get('jwtsecret'), { expiresIn : 60*60*24 });

        response.status(HttpStatus.OK).send({token: token});
        SaveAudit(users[0].id, "", "", TIPOOPERACION.LOGINOK, location);
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
        let repo = new UsuarioRepository();
        let users = await repo.GetByFilter(email);

        // usuario existente
        if (users.length > 0) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Ya existe un usuario con el mismo email"}).end();
            return;
        }

        // se hashea el password
        let hashedPassword = passwordHash.generate(password);

        let usuario: Usuarios = new Usuarios();
        usuario.email = email;
        usuario.fechaalta = new Date();
        usuario.fechanacimiento = fechaParam;
        usuario.idestado = 0;
        usuario.moneda = moneda;
        usuario.nombre = nombre;
        usuario.password = hashedPassword;

        await repo.Insert(usuario);

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
        let repo = new UsuarioRepository();
        let users = await repo.GetByFilter(request.query.email);

        response.status(HttpStatus.OK).send(users).end();
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});

//obtiene todos los conceptos de un usuario
apiRoutes.get('/usuarios/conceptos', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id;
        if (isNaN(idUsuario)) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        let repo = new ConceptosRepository();
        let conceptos = await repo.GetByUsuario(idUsuario);

        response.status(HttpStatus.OK).send(conceptos).end();
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});

//obtiene un usuario por id
apiRoutes.get('/usuarios/:id', async function (request, response, next) {
    
    try {
        let id = request.params.id;
        if (isNaN(id)) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        let repo = new UsuarioRepository();
        let user = await repo.GetById(id);
        if (user === undefined) {
            response.status(HttpStatus.NOT_FOUND).end();
            return;
        }
        
        response.status(HttpStatus.OK).send(user).end();
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

        if (isNaN(idUsuario)) {
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

        let repo = new UsuarioRepository();
        
        // se valida que no exista otro usuario con el mismo email
        if (email != undefined) {
            let users = await repo.GetByFilter(email);

            // otro usuario ya tiene el mismo email
            if (users.length > 0 &&
                users[0].id != idUsuario) {
                response.status(HttpStatus.BAD_REQUEST).send({message: "Ya existe un usuario con el mismo email"}).end();
                return;
            }
        }

        // se obtienen todos los datos del usuario a actualizar
        let user = await repo.GetById(idUsuario)
        if (user == null) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Usuario Inexistente"}).end();
            return;
        }

        user.email = (email != undefined && email.length > 0) ? email : user.email;
        user.fechanacimiento = (fechaNacimParsed != undefined) ? fechaNacimParsed : user.fechanacimiento;
        user.moneda = (moneda != undefined && moneda.length > 0) ? moneda : user.moneda;
        user.nombre = (nombre != undefined && nombre.length > 0) ? nombre : user.nombre;
        user.password = (password != undefined && password.length > 0) ? passwordHash.generate(password) : user.password;

        await repo.Update(user);

        response.status(HttpStatus.OK).send().end();
    } catch(err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});



/**** CONCEPTOS ****************************************************************************************/

//obtiene el total de cada concepto para un mes parametrizado para un usuario
apiRoutes.get('/conceptos/mensual/:mes/sumary', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id;
        if (isNaN(idUsuario)) {
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

        let repo = new ConceptosRepository();
        let conceptosTotalMes = await repo.GetConceptosMensual(idUsuario, fecha);

        response.status(HttpStatus.OK).send(conceptosTotalMes).end();
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }

});

//obtiene las fechas que un concepto tuvo movimientos YYYYMM para un usuario
apiRoutes.get('/conceptos/:id/movimientos/mensual/:mes', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id;
        if (isNaN(idUsuario)) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        const idConcepto = request.params.id;
        if (isNaN(idConcepto)) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id concepto invalido"}).end();
            return;
        }

        const fecha = request.params.mes;
        if (isNaN(fecha) || fecha.length != 6) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Mes invalido"}).end();
            return;
        }

        let repo = new ConceptosRepository();
        let concep = await repo.GetConceptosMovimMensual(idUsuario, fecha, idConcepto);

        response.status(HttpStatus.OK).send(concep).end();
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

        if (isNaN(idUsuario)) {
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
        let repoConcepto = new ConceptosRepository();
        let conceptoSearch = await repoConcepto.GetByDescrcipcion(idUsuario, descripcion);
        if (conceptoSearch !== undefined) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Ya existe concepto con el mismo nombre"}).end();
            return;
        }

        let concepto = new Conceptos();
        concepto.credito = credito;
        concepto.descripcion = descripcion;
        concepto.fechaalta = new Date();
        concepto.idestado = 0;
        concepto.idusuario = idUsuario;
        await repoConcepto.Insert(concepto);
        
        response.status(HttpStatus.OK).send().end();
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

            if (isNaN(idUsuario)) {
                response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
                return;
            }

            if (isNaN(idConcepto)) {
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
        let repoConcepto = new ConceptosRepository();
        let conceptoSearch = await repoConcepto.GetById(idConcepto);
        
        if (conceptoSearch === undefined ||
            conceptoSearch.idusuario !== idUsuario) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "El concepto no pertenece al usuario"}).end();
            return;
        }

        // se valida que no haya otro concepto con el mismo nombre para ese usuario
        conceptoSearch = await repoConcepto.GetByDescrcipcion(idUsuario, descripcion);
        if (conceptoSearch !== undefined &&
            conceptoSearch.id != idConcepto) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Ya existe otro concepto con el mismo nombre"}).end();
            return;
        }

        let concepto = new Conceptos();
        concepto.credito = credito;
        concepto.descripcion = descripcion;
        concepto.id = idConcepto;
        await repoConcepto.Update(concepto);
        
        response.status(HttpStatus.OK).send().end();
    } catch(err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});

//obtiene el total de cada concepto para un anio parametrizado para un usuario
apiRoutes.get('/conceptos/anual/:anio/sumary', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id;
        if (isNaN(idUsuario)) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        let anio = request.params.anio;
        if (isNaN(anio) === true) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Anio invalido"}).end();
            return;
        }

        let repo = new ConceptosRepository();
        let conceptosTotalAnio = await repo.GetConceptosAnual(idUsuario, anio);

        response.status(HttpStatus.OK).send(conceptosTotalAnio).end();
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }

});

//obtiene los meses que un concepto tuvo movimientos YYYY para un usuario
apiRoutes.get('/conceptos/:id/movimientos/anual/:anio', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id;
        if (isNaN(idUsuario)) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        const idConcepto = request.params.id;
        if (isNaN(idConcepto)) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id concepto invalido"}).end();
            return;
        }

        const anio = request.params.anio;
        if (isNaN(anio)) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Anio invalido"}).end();
            return;
        }

        let repo = new ConceptosRepository();
        let concep = await repo.GetConceptosMovimAnual(idUsuario, anio, idConcepto);

        response.status(HttpStatus.OK).send(concep).end();
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});

//obtiene el total de cada concepto en la historia de un usuario
apiRoutes.get('/conceptos/historico/sumary', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id;
        if (isNaN(idUsuario)) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        let repo = new ConceptosRepository();
        let conceptosTotalHist = await repo.GetConceptosHistorico(idUsuario);

        response.status(HttpStatus.OK).send(conceptosTotalHist).end();
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }

});

//obtiene los anios que un concepto tuvo movimientos para un usuario
apiRoutes.get('/conceptos/:id/movimientos/historico', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id;
        if (isNaN(idUsuario)) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        const idConcepto = request.params.id;
        if (isNaN(idConcepto)) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id concepto invalido"}).end();
            return;
        }

        let repo = new ConceptosRepository();
        let concep = await repo.GetConceptosMovimHistorico(idUsuario, idConcepto);

        response.status(HttpStatus.OK).send(concep).end();
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});



/**** MENSUAL ******************************************************************************************/

//obtiene el total mensual de un usuario para una fecha YYYYMM
apiRoutes.get('/mensual/:fecha/sumary', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id;
        if (isNaN(idUsuario)) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        let fecha = request.params.fecha;
        if (isNaN(fecha) ||
            fecha.length < 5 || 
            fecha.length > 6) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Fecha invalida"}).end();
            return;
        }

        let repo = new MensualRepository();
        let mensual = await repo.GetTotal(idUsuario, fecha);

        response.status(HttpStatus.OK).send(mensual).end();
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});


/**** ANUAL ******************************************************************************************/

//obtiene el total anual de un usuario para una fecha YYYY
apiRoutes.get('/anual/:fecha/sumary', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id;
        if (isNaN(idUsuario)) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        let fecha = request.params.fecha;
        if (isNaN(fecha) ||
            fecha.length != 4) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Año invalido"}).end();
            return;
        }

        let repo = new AnualRepository();
        let anual = await repo.GetTotal(idUsuario, fecha);

        response.status(HttpStatus.OK).send(anual).end();
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});


/**** HISTORICO ******************************************************************************************/

//obtiene el total historico de un usuario
apiRoutes.get('/historico/sumary', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id;
        if (isNaN(idUsuario)) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        let repo = new HistoricoRepository();
        let hist = await repo.GetTotal(idUsuario);

        response.status(HttpStatus.OK).send(hist).end();
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

        if (isNaN(idUsuario)) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        if (isNaN(importe)) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Importe invalido"}).end();
            return;
        }

        if (isNaN(idConcepto)) {
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
        fechaParam.setUTCHours(0, 0, 0, 0);
        
        // se valida que el concepto pertenezca al usuario
        let repo = new ConceptosRepository();
        let concepto = await repo.GetById(idConcepto);
        
        if (concepto === undefined ||
            concepto.idusuario !== idUsuario) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "El conepto no pertenece al usuario"}).end();
            return;
        }

        // se verifica si ya exisgte el item cargado para esa fecha
        let repoDiario = new DiarioRepository();
        let diario = await repoDiario.GetById(idConcepto, fechaParam);

        // no existe el item, hay que insertarlo
        if (diario === undefined) {
            diario = new Diario();
            diario.fecha = fechaParam;
            diario.fechaalta = new Date();
            diario.idconcepto = idConcepto;
            diario.importe = importe;
            await repoDiario.Insert(diario);
        } else {
            // ya existe el item, hay que actualizarlo
            diario.importe = importe;
            await repoDiario.Update(diario);
        }

        response.status(HttpStatus.OK).send().end();
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});

//obtiene el primer consumo del usuario
apiRoutes.get('/diario/first', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id;
        if (isNaN(idUsuario)) {
            response.status(HttpStatus.BAD_REQUEST).send({message: "Id usuario invalido"}).end();
            return;
        }

        let repo = new DiarioRepository();
        let minDiario = await repo.GetMinConsumoByUsuario(idUsuario);

        response.status(HttpStatus.OK).send(minDiario).end();
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});

//obtiene todos los gastos diarios de un usuario para una fecha
apiRoutes.get('/diario/:fecha', async function (request, response, next) {
    
    try {
        const idUsuario = request.decoded.id;
        if (isNaN(idUsuario)) {
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

        let repo = new DiarioRepository();
        let diario = await repo.GetByUsuario(idUsuario, fechaParam);

        response.status(HttpStatus.OK).send(diario).end();
    } catch (err) {
        setImmediate(() => { next(new Error(JSON.stringify(err))); });
    }
});


/********************************************************************************************************/


// la aplicacion va a usar las rutas previamete seteadas
app.use('/api', apiRoutes);
logger.info({message: "set api routes ok"});

// global error handler
app.use(function(err, req, res, next) {
    
    let errorId = uuid.v4();
    res.status(500).send({errorId: errorId});
    
    // se loguea el error
    logger.error({errorId: errorId, message: err});
});

logger.info({message: "init ok"});
app.listen(config.app.port);
