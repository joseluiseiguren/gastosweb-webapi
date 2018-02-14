import "reflect-metadata";
import {createConnection, Connection, getConnectionManager} from "typeorm";
import {Usuarios} from "./entity/Usuarios";
import {Conceptos} from "./entity/Conceptos";
import { UsuarioRepository } from "./repositorios/UsuariosRepository";
import { ConceptosRepository } from "./repositorios/ConceptosRepository";
import { DiarioRepository } from "./repositorios/DiarioRepository";
import { Diario } from "./entity/Diarios";

var express         = require('express');
var cors            = require('cors');
var HttpStatus      = require('http-status-codes');
var passwordHash    = require('password-hash');
var morgan          = require('morgan');
var jwt             = require('jsonwebtoken');
var config          = require('./config'); 
var bodyParser      = require('body-parser');
var multer          = require('multer');

let app = express();
let upload = multer();

app.use(cors())
app.use(bodyParser.json());
app.set('jwtsecret', config.secret);

var apiRoutes = express.Router();

// se pide un login y se entrega un token
apiRoutes.post('/usuarios/login', async (request, response, next) => {
    
    const email = request.body.email,
          password = request.body.password;

    if (password === undefined) {
        response.status(HttpStatus.UNAUTHORIZED).end();
        return;
    }

    // se obtiene el usuario via email
    let repo = new UsuarioRepository();
    let users = await repo.GetByFilter(email);

    // usuario inexistente
    if (users.length <= 0) {
        response.status(HttpStatus.UNAUTHORIZED).end();
        return;
    }

    // se valida el password
    if (passwordHash.verify(password, users[0].password) === false) {
        response.status(HttpStatus.UNAUTHORIZED).end();
        return;
    }

    // para hashear
    // var hashedPassword = passwordHash.generate('password123');

    const payload = {
        user: users[0].nombre,
        id: users[0].id 
    };

    var token = jwt.sign(payload, app.get('jwtsecret'), { expiresIn : 60*60*24 });

    response.status(HttpStatus.OK).send({token: token});
});

// middleware para validar el token
apiRoutes.use(function(request, response, next) {

    // tuvo que haber venido en el header http
    var token = request.headers['x-access-token'];
  
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, 
                    app.get('jwtsecret'), 
                    function(err, decoded) {      
                        if (err){
                            response.status(HttpStatus.UNAUTHORIZED).end();
                            return;
                        } else {
                            request.decoded = decoded;    
                            next();
                        }
                    });
    } else {
        // there is no token
        response.status(HttpStatus.UNAUTHORIZED).end();
        return;
    }
});

//obtiene una lista de usuarios segun filtros
apiRoutes.get('/usuarios', async function(request, response) {
    let repo = new UsuarioRepository();
    let users = await repo.GetByFilter(request.query.email);

    response.status(HttpStatus.OK).send(users).end();
});

//obtiene un usuario por id
apiRoutes.get('/usuarios/:id', async function (request, response) {
    
    let id = request.params.id;
    if (isNaN(id)) {
        response.status(HttpStatus.BAD_REQUEST).send('Invalid Id').end();
        return;
    }

    let repo = new UsuarioRepository();
    let user = await repo.GetById(id);
    if (user === undefined) {
        response.status(HttpStatus.NOT_FOUND).end();
        return;
    }
    
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.status(HttpStatus.OK).send(user).end();
});

//obtiene todos los conceptos de un usuario
apiRoutes.get('/usuarios/:id/conceptos', async function (request, response) {
    
    let id = request.params.id;
    if (isNaN(id)) {
        response.status(HttpStatus.BAD_REQUEST).send('Invalid Id').end();
        return;
    }

    let repo = new ConceptosRepository();
    let conceptos = await repo.GetByUsuario(id);

    response.status(HttpStatus.OK).send(conceptos).end();
});

//obtiene todos los gastos diarios de un usuario para una fecha
apiRoutes.get('/usuarios/:id/diario/:fecha', async function (request, response) {
    
    let id = request.params.id;
    if (isNaN(id)) {
        response.status(HttpStatus.BAD_REQUEST).send('Invalid Id').end();
        return;
    }

    let fecha : Date = new Date(request.params.fecha);
    if (isNaN(fecha.getTime())) {
        response.status(HttpStatus.BAD_REQUEST).send('Invalid Date').end();
        return;
    }

    let repo = new DiarioRepository();
    let diario = await repo.GetByUsuario(id, fecha);

    response.status(HttpStatus.OK).send(diario).end();
});

//insera o actualiza un item diario
apiRoutes.post('/diario', async function (request, response) {
    
    const idUsuario = request.decoded.id,
          fecha: Date = new Date(request.body.fecha),
          importe = request.body.importe,
          idConcepto = request.body.idConcepto;

    if (isNaN(idUsuario) || isNaN(importe) || isNaN(idConcepto)) {
        response.status(HttpStatus.BAD_REQUEST).send().end();
        return;
    }

    if (isNaN(fecha.getTime())) {
        response.status(HttpStatus.BAD_REQUEST).send().end();
        return;
    }

    // se valida que el concepto pertenezca al usuario
    let repo = new ConceptosRepository();
    let concepto = await repo.GetById(idConcepto);
    
    if (concepto === undefined ||
        concepto.idusuario !== idUsuario) {
        response.status(HttpStatus.BAD_REQUEST).end();
        return;
    }

    // se verifica si ya exisgte el item cargado para esa fecha
    let repoDiario = new DiarioRepository();
    let diario = await repoDiario.GetById(idConcepto, fecha);

    // no existe el item, hay que insertarlo
    if (diario === undefined) {
        diario = new Diario();
        diario.fecha = fecha;
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
});

// la aplicacion va a usar las rutas previamete seteadas
app.use('/api', apiRoutes);

app.listen(3000);
