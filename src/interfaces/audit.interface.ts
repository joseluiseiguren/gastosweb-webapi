import {audit} from '../app.models/audit.app.model';

export interface auditInterface {
    
    Insert(auditoria: audit): Promise<void>;
}