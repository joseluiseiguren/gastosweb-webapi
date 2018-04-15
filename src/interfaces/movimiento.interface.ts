import { sumaryMovimiento } from '../app.models/movimiento.sumary.app.model';
import { movimiento } from '../app.models/movimiento.app.model';
import { firstlastMovimiento } from '../app.models/movimiento.firstlast.app.model';

export interface movimientoInterface {
    
    GetMensualSumary(idUsuario: string, anio: number, mes: number): Promise<sumaryMovimiento>;

    GetAnualSumary(idUsuario: string, anio: number): Promise<sumaryMovimiento>;

    GetHistoricoSumary(idUsuario: string): Promise<sumaryMovimiento>;

    GetByFilter(idUsuario: string, idConcepto: string, fechaDesde: Date, fechaHasta: Date): Promise<Array<movimiento>>;

    Insert(mov: movimiento): Promise<void>;

    Update(mov: movimiento): Promise<void>;

    GetFirstLast(idUsuario: string): Promise<firstlastMovimiento>;
}