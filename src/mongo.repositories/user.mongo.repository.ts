var mongoose = require('mongoose');
var UserModel = require('../mongo.models/user.mongo.model');
import {userInterface} from '../interfaces/user.interface';
import {user} from '../app.models/user.app.model';

var conection = require('../mongo.repositories/conection');

export class userRepositoryMongo implements  userInterface {
    
    public async GetByFilter(email: string): Promise<Array<user>> {

        let searchFilter: {[k: string]: any} = {};

        // filtro por email
        if (email != undefined &&
            email.length > 0) {
            searchFilter.email = { $regex: new RegExp("^" + email.toLowerCase(), "i")};
        }

        var resultMongo = await UserModel.find(searchFilter, { __v: 0 });

        var lstUser = resultMongo.map(function(usuarioMongo){ 
            let usr: user = new user();

            usr._id = usuarioMongo._id;
            usr.intentosfallidoslogin = usuarioMongo.intentosfallidoslogin;
            usr.fechaalta = usuarioMongo.fechaalta;
            usr.email = usuarioMongo.email;
            usr.nombre = usuarioMongo.nombre;
            usr.fechanacimiento = usuarioMongo.fechanacimiento;
            usr.idestado = usuarioMongo.idestado;
            usr.moneda = usuarioMongo.moneda;
            usr.password = usuarioMongo.password;
            
            return usr;
        });

        return lstUser;
    }

    public async GetById(id: string): Promise<user> {

        let resultMongo = await UserModel.findOne({_id:new mongoose.Types.ObjectId(id)});

        if (resultMongo === null){
            return null;
        }

        return this.MapMongoToAppModel(resultMongo);
    }

    public async Update(usuario: user): Promise<void> {

        // se actualiza el usuario
        await UserModel.update(
            {_id: new mongoose.Types.ObjectId(usuario._id)}, 
            {intentosfallidoslogin: usuario.intentosfallidoslogin,
             email: usuario.email,
             nombre: usuario.nombre,
             fechanacimiento: usuario.fechanacimiento,
             idestado: usuario.idestado,
             moneda: usuario.moneda,
             password: usuario.password}
        );
        
    }

    public async Insert(usuario: user): Promise<void> {

        let userM = new UserModel({
            email: usuario.email,
            nombre: usuario.nombre,
            fechanacimiento: usuario.fechanacimiento,
            idestado: 0,
            moneda: usuario.moneda,
            password: usuario.password});

        // se inserta el usuario
        await userM.save();        
    }

    private MapMongoToAppModel(usuarioMongo: any) : user {
        
        let usr: user = new user();

        usr._id = usuarioMongo._id;
        usr.intentosfallidoslogin = usuarioMongo.intentosfallidoslogin;
        usr.fechaalta = usuarioMongo.fechaalta;
        usr.email = usuarioMongo.email;
        usr.nombre = usuarioMongo.nombre;
        usr.fechanacimiento = usuarioMongo.fechanacimiento;
        usr.idestado = usuarioMongo.idestado;
        usr.moneda = usuarioMongo.moneda;
        usr.password = usuarioMongo.password;

        return usr;
    }
}