import {user} from '../app.models/user.app.model';

export interface userInterface {
    
    GetByFilter(email: string): Promise<Array<user>>;

    GetById(id: string): Promise<user>;

    Update(usuario: user): Promise<void>;

    Insert(usuario: user): Promise<void>;
}