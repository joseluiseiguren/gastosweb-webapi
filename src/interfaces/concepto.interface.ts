import { concepto } from '../app.models/concepto.app.model';
import { conceptoSumary } from '../app.models/concepto.sumary.app.model';
import { conceptoMovimiento } from '../app.models/concepto.movimiento.app.model';
import { conceptoMovimientoAnual } from '../app.models/concepto.movimiento.anual.app.model';
import { conceptoMovimientoHist } from '../app.models/concepto.movimiento.hist.app.model';
import { movimientoDiario } from '../app.models/movimiento.diario.app.model';

export interface conceptoInterface {
    
    GetByFilter(userId: string, descripcion: string, conceptoId: string): Promise<Array<concepto>>;

    GetMensualSumary(idUsuario: string, anio: number, mes: number): Promise<Array<conceptoSumary>>;

    GetMensualByConcept(idUsuario: string, idConcepto: string, anio: number, mes: number): Promise<Array<conceptoMovimiento>>;

    Insert(concepto: concepto): Promise<void>;

    Update(concepto: concepto): Promise<void>;

    GetAnualSumary(idUsuario: string, anio: number): Promise<Array<conceptoSumary>>;

    GetAnualByConcept(idUsuario: string, idConcepto: string, anio: number): Promise<Array<conceptoMovimientoAnual>>;

    GetHistoricoSumary(idUsuario: string): Promise<Array<conceptoSumary>>;

    GetHistoricoByConcept(idUsuario: string, idConcepto: string): Promise<Array<conceptoMovimientoHist>>;

    GetDiarioSumary(idUsuario: string, anio: number, mes: number, dia: number): Promise<Array<movimientoDiario>>;
}