import { v4 as uuidv4 } from "uuid";
import { Affected } from "../../domain/affected/affected";
import { CPF } from "../../domain/affected/cpf";
import { AffectedRepository } from "../../repositories/IAffectedRepository";

interface RegisterAffectedRequest {
    name: string,
    age: number,
    sex: string,
    cpf: CPF,
    contact: string,
    familyId: string,
    hasCleanWaterAccess: boolean,
    hasElectricityAccess: boolean,
    canCook: boolean,
    inParentOrFriendHouse: boolean,
    inPublicShelter: boolean,
    exCleanWater: string,
    exElectricity: string,
    exParentOrFriendHouse: string,
    exPublicShelter: string,
    disasterId: string,
}


class RegisterAffected {
    constructor(private affectedRepository: AffectedRepository) {}

    async execute(request: RegisterAffectedRequest): Promise<Affected> {
        const affected = new Affected({
            id: uuidv4(),
            name: request.name,
            age: request.age,
            sex: request.sex,
            cpf: request.cpf,
            contact: request.contact,
            hasCleanWaterAccess: request.hasCleanWaterAccess,
            hasElectricityAccess: request.hasElectricityAccess,
            canCook: request.canCook,
            inParentOrFriendHouse: request.inParentOrFriendHouse,
            inPublicShelter: request.inPublicShelter,
            exCleanWater: request.exCleanWater,
            exElectricity: request.exElectricity,
            exParentOrFriendHouse: request.exParentOrFriendHouse,
            exPublicShelter: request.exPublicShelter,
            familyId: request.familyId,
        });

        await this.affectedRepository.save(affected);

        return affected;
    }
}

export {
    RegisterAffected,
    RegisterAffectedRequest
}