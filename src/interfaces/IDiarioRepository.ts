export interface IDiarioRepository {
    GetByUsuario(idUsuario: number, fecha: Date) : Promise<any[]>;
}