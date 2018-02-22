export interface IAnualRepository {

    GetTotal(idUsuario: number, fecha: number) : Promise<any>;
}