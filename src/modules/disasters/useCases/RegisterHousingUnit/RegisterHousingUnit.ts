import { v4 as uuidv4 } from "uuid";
import { HousingUnit } from "../../domain/housingUnit/housing-unit";
import { HousingUnitRepository } from "../../repositories/IHousingUnitRepository";

interface CreateHousingUnitRequest {
    affectedAreaId: string;
}


class CreateHousingUnit {
    constructor(private housingUnitRepository: HousingUnitRepository) {}

    async execute(request: CreateHousingUnitRequest): Promise<HousingUnit> {
        const housingUnit = new HousingUnit({
            id: uuidv4(),
            affectedAreaId: request.affectedAreaId,
        });

        await this.housingUnitRepository.save(housingUnit);

        return housingUnit;
    }
}

export {
    CreateHousingUnit,
    CreateHousingUnitRequest
}