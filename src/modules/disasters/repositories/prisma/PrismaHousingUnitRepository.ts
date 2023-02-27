import { HousingUnit } from "src/modules/disasters/domain/housingUnit/housing-unit";
import { HousingUnitRepository } from "../../../../repositories/IHousingUnitRepository";

class PrismaHousingUnitRepository implements HousingUnitRepository {
    save(housingUnit: HousingUnit): Promise<void> {
        throw new Error("Method not implemented.");
    }
    find(id: string): Promise<HousingUnit> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<HousingUnit[]> {
        throw new Error("Method not implemented.");
    }

}