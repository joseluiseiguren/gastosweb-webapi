export class audit {
    _id: string;
    idusuario: string;
    observacion: string;
    aditionalinfo: string;
    tipooperacion: Number;
    location: string;
    fecha: Date;

    public constructor(
        fields?: {
            _id?: string,
            idusuario?: string,
            observacion?: string,
            aditionalinfo?: string,
            tipooperacion?: Number,
            location?: string,
            fecha?: Date
        }) {
        if (fields) Object.assign(this, fields);
    }
}