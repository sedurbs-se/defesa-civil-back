import { Family } from "src/modules/disasters/domain/family/family";
import { FamilyRepository } from "../../../../repositories/IFamilyRepository";

class PrismaFamilyRepository implements FamilyRepository {
    save(family: Family): Promise<void> {
        throw new Error("Method not implemented.");
    }
    find(id: string): Promise<Family> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<Family[]> {
        throw new Error("Method not implemented.");
    }

}