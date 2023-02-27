import { AffectedArea } from "src/modules/disasters/domain/affectedArea/affected-area";
import { AffectedAreaRepository } from "../../../../repositories/IAffectedAreaRepository";

class PrismaAffectedAreaRepository implements AffectedAreaRepository {
    async save(affectedArea: AffectedArea): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async find(id: string): Promise<AffectedArea> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<AffectedArea[]> {
        throw new Error("Method not implemented.");
    }
}

export {
    PrismaAffectedAreaRepository
}