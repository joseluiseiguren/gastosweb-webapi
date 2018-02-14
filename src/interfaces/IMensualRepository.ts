export interface IMensualRepository {

    GetTotal(idUsuario: number, fecha: string /* YYYYMM */) : Promise<any>;
}