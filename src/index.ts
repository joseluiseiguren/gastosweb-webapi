import "reflect-metadata";
import {createConnection, Connection, getConnectionManager} from "typeorm";
import {User} from "./entity/User";
import {Usuarios} from "./entity/Usuarios";

import express = require('express');
import { UsuarioRepository } from "./repositorios/UsuariosRepository";
let app = express();
let HttpStatus = require('http-status-codes');

// For POST-Support
let bodyParser = require('body-parser');
let multer = require('multer');
let upload = multer();

/*
createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);
    
    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);
     
    console.log("Here you can setup and run express/koa/any other framework.");
    
}).catch(error => console.log(error));

    createConnection().then(async connection => {
        console.log("2");
        let userRepository = connection.getRepository(Usuarios);
        //let savedUsers = await userRepository.find({ email: "Jose Luis" });
        let savedUsers = await userRepository.find({ email: "joseluiseiguren@gmail.com" });
        
        response.send(savedUsers);
        return;
        
    }).catch(error => console.log(error));

    //response.send('no data found');
*/

app.use(bodyParser.urlencoded({
    extended: true
}));

//obtiene un usuario por id
app.get('/api/usuarios/:id', async function (request, response) {
    let id = request.params.id;
    let repo = new UsuarioRepository();
    let user = await repo.GetById(id);

    if (user === undefined) {
        response.status(HttpStatus.NOT_FOUND).end();
        return;
    }
    
    response.status(HttpStatus.OK).send(user).end();
});

app.get('/api/sayhello/:name', (request, response) => {
    let name = request.params.name;

    if (!isNaN(name)) {
        response
            .status(400)
            .send('No string as name');
    } else {
        response.json({
            "message": name
        });
    }
});

app.get('/api/sayhello/', (request, response) => {
    let name = request.query.name;

    let result = {
        message: name
    };

    if (!isNaN(name)) {
        response
            .status(400)
            .send('No string as name');
    } else {
        response.json(result);
    }
});

app.post('/api/sayHello', upload.array(), (request, response) => {
    let name = request.body.name;

    if (!isNaN(name)) {
        response
            .status(400)
            .send('No string as name');
    } else {
        console.log('Hello ' + name);
    }

    response.send('POST request to homepage');
});


app.listen(3000);