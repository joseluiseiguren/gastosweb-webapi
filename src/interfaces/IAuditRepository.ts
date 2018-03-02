import { Audit } from "../entity/Audit";

export interface IAuditRepository {

    Insert(audit: Audit) : Promise<void>;
}