import { Affected } from "../entities/affected";


export abstract class AffectedRepository {
    abstract save(affected: Affected): Promise<void>;
    abstract find(id: string): Promise<Affected>;
    abstract findAll(): Promise<Affected[]>;
}