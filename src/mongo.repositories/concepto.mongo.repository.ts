var ConceptoModel = require('../mongo.models/concepto.mongo.model');
import {conceptoInterface} from '../interfaces/concepto.interface';
import {concepto} from '../app.models/concepto.app.model';

export class conceptoRepositoryMongo implements  conceptoInterface {
    public async GetByFilter(userId: string): Promise<Array<concepto>> {

        let searchFilter: {[k: string]: any} = {};

        // filtro por userid
        if (userId != undefined &&
            userId.length > 0) {
            searchFilter.user = userId;
        }
        
        var resultMongo = await ConceptoModel.find(searchFilter, { __v: 0 }).sort('descripcion'); ;

        var lstConcep = resultMongo.map(function(conceptoMongo){ 
            let cnp: concepto = new concepto();

            cnp._id = conceptoMongo._id;
            cnp.descripcion = conceptoMongo.descripcion;
            cnp.credito = conceptoMongo.credito;
            cnp.user = conceptoMongo.user;
            cnp.fechaalta = conceptoMongo.fechaalta;
            
            return cnp;
        });

        return lstConcep;
    }    
}