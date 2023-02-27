import { Family } from "../domain/family/family";


export abstract class FamilyRepository {
    abstract save(family: Family): Promise<void>;
    abstract find(id: string): Promise<Family>;
    abstract findAll(): Promise<Family[]>;
}