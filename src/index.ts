import "reflect-metadata";
import {createConnection, Connection, getConnectionManager} from "typeorm";
import {Usuarios} from "./entity/Usuarios";
import { UsuarioRepository } from "./repositorios/UsuariosRepository";

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
        user: users[0].nombre 
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

// la aplicacion va a usar las rutas previamete seteadas
app.use('/api', apiRoutes);

app.listen(3000);
