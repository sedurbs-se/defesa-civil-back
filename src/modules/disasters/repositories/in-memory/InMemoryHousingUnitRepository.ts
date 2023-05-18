import { HousingUnit } from "src/modules/disasters/domain/housingUnit/housing-unit";
import { HousingUnitRepository } from "../IHousingUnitRepository";

class InMemoryHousingUnitRepository implements HousingUnitRepository {
    constructor(private housingUnits: HousingUnit[] = []) {};

    async save(housingUnit: HousingUnit): Promise<void> {
        await this.housingUnits.push(housingUnit)
    }
    async find(id: string): Promise<HousingUnit> {
        const exists = await this.housingUnits.find((housingUnit) => housingUnit.id === id)
        if(!exists) return null
        return exists;
    }
    async findAll(): Promise<HousingUnit[]> {
        return this.housingUnits;
    }

}

export default InMemoryHousingUnitRepository