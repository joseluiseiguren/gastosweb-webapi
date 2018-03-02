export interface IHistoricoRepository {

    GetTotal(idUsuario: number) : Promise<any>;
}