import "reflect-metadata";
import {createConnection, Connection, getConnectionManager} from "typeorm";
import {User} from "./entity/User";
import {Usuarios} from "./entity/Usuarios";
import { UsuarioRepository } from "./repositorios/UsuariosRepository";

var express = require('express');
var cors = require('cors')
let app = express();
let HttpStatus = require('http-status-codes');

// For POST-Support
let bodyParser = require('body-parser');
let multer = require('multer');
let upload = multer();

app.use(cors())
app.use(bodyParser.json());


//obtiene una lista de usuarios segun filtros
app.get('/api/usuarios', async function (request, response) {
    
    console.log(request.query.email);
    console.log(request.headers);

    let repo = new UsuarioRepository();
    let users = await repo.GetByFilter(request.query.email);

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.status(HttpStatus.OK).send(users).end();
});

//obtiene un usuario por id
app.get('/api/usuarios/:id', async function (request, response) {
    
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

app.post('/api/usuarios/login', (request, response, next) => {
    const email = request.body.email,
          password = request.body.password;

    console.log(request.body);

    if (password === undefined) {
        // send status 401 Unauthorized
        response.status(HttpStatus.UNAUTHORIZED).end();
        return;
    }

    let user = {token:"abc"};
    response.status(HttpStatus.OK).send(user);
});


app.listen(3000);
