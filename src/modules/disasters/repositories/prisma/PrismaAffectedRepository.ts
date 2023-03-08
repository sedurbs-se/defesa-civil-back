import { Affected } from "src/modules/disasters/domain/affected/affected";
import { AffectedRepository } from "../IAffectedRepository";

class PrismaAffectedRepository implements AffectedRepository {
    updateMany(affecteds: Affected[], field: any): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async save(affected: Affected): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async find(id: string): Promise<Affected> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<Affected[]> {
        throw new Error("Method not implemented.");
    }
}