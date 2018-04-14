import {concepto} from '../app.models/concepto.app.model';

export interface conceptoInterface {
    
    GetByFilter(userId: string): Promise<Array<concepto>>;
}