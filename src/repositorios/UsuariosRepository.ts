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
        try {
            let dbConnection = await GetDbConnection();
            let userRepository = dbConnection.getRepository(Usuarios);
            
            var filter: {[k: string]: any} = {};
            
            // filtro por email
            if (email !== undefined && email.length > 0) {
                filter.email = email; }

            let user = await userRepository.find(filter);
            
            //console.log(user);
            
            return user;
        } catch (err) {
            throw err;
        }
    }

    async Update(usuario: Usuarios) : Promise<void> {
        
        let dbConnection = await GetDbConnection();

        await dbConnection
            .createQueryBuilder()
            .update(Usuarios)
            .set({
                email: usuario.email,
                nombre: usuario.nombre,
                fechanacimiento: usuario.fechanacimiento,
                password: usuario.password,
                moneda: usuario.moneda,
                idestado: usuario.idestado})
            .where("id = :id", 
                    { id: usuario.id}) 
            .execute();
    }

    async Insert(usuario: Usuarios) : Promise<void> {
        
        let dbConnection = await GetDbConnection();

        //console.log(diario);

        await dbConnection
            .createQueryBuilder()
            .insert()
            .into(Usuarios)
            .values(
                    {email: usuario.email, 
                     nombre: usuario.nombre,
                     fechanacimiento: usuario.fechanacimiento,
                     fechaalta: usuario.fechaalta,
                     idestado: usuario.idestado,
                     password: usuario.password,
                     moneda: usuario.moneda}) 
            .execute();
    }
}