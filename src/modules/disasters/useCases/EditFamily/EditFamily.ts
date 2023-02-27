import { OptionalExceptFor } from "src/core/logic/OptionalExceptFor";
import { Family, FamilyProps } from "../../domain/family/family";
import { FamilyRepository } from "../../repositories/IFamilyRepository";

type EditFamilyRequest = OptionalExceptFor<FamilyProps, 'id'>


export class EditFamily {
    constructor(private familyRepository: FamilyRepository,) {}

    async execute(request: EditFamilyRequest): Promise<Family> {

        const family = await this.familyRepository.find(request.id);

        if (!family) {
            throw new Error('Family not found');
        }

        const mergedFamily = { ...family, ...request };

        const updatedFamily = new Family(mergedFamily as FamilyProps)

        await this.familyRepository.save(updatedFamily);

        return updatedFamily;
    }
}