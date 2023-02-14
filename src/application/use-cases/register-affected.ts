import { v4 as uuidv4 } from "uuid";
import { Affected } from "../entities/affected";
import { CPF } from "../entities/cpf";
import { AffectedRepository } from "../repositories/affected-repository";

interface RegisterAffectedRequest {
    name: string,
    age: number,
    sex: string,
    cpf: CPF,
    contact: string,
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


export class RegisterAffected {
    constructor(private affectedRepository: AffectedRepository) {}

    async execute(request: RegisterAffectedRequest): Promise<Affected> {
        const disaster = new Affected({
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
            disasterId: request.disasterId,
        });

        await this.affectedRepository.save(disaster);

        return disaster;
    }
}