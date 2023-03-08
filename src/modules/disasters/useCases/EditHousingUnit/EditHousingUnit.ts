import { OptionalExceptFor } from "src/core/logic/OptionalExceptFor";
import { HousingUnit, HousingUnitProps } from "../../domain/housingUnit/housing-unit";
import { HousingUnitRepository } from "../../repositories/IHousingUnitRepository";

type EditHousingUnitRequest = OptionalExceptFor<HousingUnitProps, 'id'>

class EditHousingUnit {
    constructor(private housingUnitRepository: HousingUnitRepository) {}

    async execute(request: EditHousingUnitRequest): Promise<HousingUnit> {
        
        const housingUnit = await this.housingUnitRepository.find(request.id);

        if (!housingUnit) {
            throw new Error('Housing Unit not found');
        }

        const mergedHousingUnit = { ...housingUnit, ...request };

        const updatedHousingUnit = new HousingUnit(mergedHousingUnit as HousingUnitProps)

        await this.housingUnitRepository.save(updatedHousingUnit);

        return updatedHousingUnit;
    }
}

export {
    EditHousingUnit,
    EditHousingUnitRequest
}