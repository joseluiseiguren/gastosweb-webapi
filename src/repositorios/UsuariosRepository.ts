import { IUsuarioRepository } from "../interfaces/IUsuarioRepository";
import { Usuarios } from "../entity/Usuarios";
import { Connection, getConnectionManager, createConnection } from "typeorm";
import { GetDbConnection } from "./DbConection";

export class UsuarioRepository implements IUsuarioRepository {
    
    async GetById(id: number): Promise<Usuarios> {    
        let dbConnection = await GetDbConnection();
        let userRepository = dbConnection.getRepository(Usuarios);
        let user = await userRepository.findOneById(id);

        return user;
    }

    async GetByFilter(email: string): Promise<Usuarios[]> {    
        let dbConnection = await GetDbConnection();
        let userRepository = dbConnection.getRepository(Usuarios);

        var filter: {[k: string]: any} = {};
        
        // filtro por email
        if (email !== undefined && email.length > 0) {
            filter.email = email; }

        let user = await userRepository.find(filter);
        
        console.log(user);
        
        return user;
    }
}