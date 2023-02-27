import { v4 as uuidv4 } from "uuid";
import { Family } from "../../domain/family/family";
import { FamilyRepository } from "../../repositories/IFamilyRepository";

interface CreateFamilyRequest {
    housingUnitId: string;
}


class CreateFamily {
    constructor(private familyRepository: FamilyRepository) {}

    async execute(request: CreateFamilyRequest): Promise<Family> {
        const disaster = new Family({
            id: uuidv4(),
            housingUnitId: request.housingUnitId,
        });

        await this.familyRepository.save(disaster);

        return disaster;
    }
}

export {
    CreateFamily,
    CreateFamilyRequest
}