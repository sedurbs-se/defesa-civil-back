import { Affected } from "../domain/affected/affected";


export abstract class AffectedRepository {
    abstract save(affected: Affected): Promise<void>;
    abstract find(id: string): Promise<Affected>;
    abstract findAll(): Promise<Affected[]>;
    abstract updateMany(affecteds: Affected[], field: any): Promise<void>;
}