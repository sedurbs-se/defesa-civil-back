import { Disaster } from "../../domain/disaster/disaster";
import { DisasterRepository } from "../../repositories/IDisasterRepository";
import { v4 as uuidv4 } from "uuid";
import { CreateAffectedAreaRequest } from "../RegisterAffectedArea/RegisterAffectedArea";
import { CreateHousingUnitRequest } from "../RegisterHousingUnit/RegisterHousingUnit";
import { CreateFamilyRequest } from "../RegisterFamily/RegisterFamily";
import { RegisterAffectedRequest } from "../RegisterAffected/RegisterAffected";
import { AffectedAreaRepository } from "src/modules/disasters/repositories/IAffectedAreaRepository";
import { HousingUnitRepository } from "src/modules/disasters/repositories/IHousingUnitRepository";
import { FamilyRepository } from "src/modules/disasters/repositories/IFamilyRepository";
import { AffectedRepository } from "src/modules/disasters/repositories/IAffectedRepository";
import { AffectedArea } from "src/modules/disasters/domain/affectedArea/affected-area";
import { HousingUnit } from "src/modules/disasters/domain/housingUnit/housing-unit";
import { Family } from "src/modules/disasters/domain/family/family";
import { Affected } from "src/modules/disasters/domain/affected/affected";

interface RegisterDisasterRequest {
    address: string;
    coordinates: number[];
    city: string;
    event: string;
    date: Date;
    agentId: string;
    affectedAreas?: (CreateAffectedAreaRequest & {
        housingUnits?: CreateHousingUnitRequest & {
            families?: CreateFamilyRequest & {
                affecteds?: RegisterAffectedRequest[];
            }[];
        }[];
    })[];
}



export class RegisterDisaster {
    constructor(
        private disasterRepository: DisasterRepository,
        private affectedAreaRepository: AffectedAreaRepository,
        private housingUnitRepository: HousingUnitRepository,
        private familyRepository: FamilyRepository,
        private affectedRepository: AffectedRepository) {}

    async execute(request: RegisterDisasterRequest): Promise<Disaster> {
        const disaster = new Disaster({
            id: uuidv4(),
            address: request.address,
            coordinates: request.coordinates,
            city: request.city,
            event: request.event,
            date: request.date,
            agentId: request.agentId,
        });

        await this.disasterRepository.save(disaster);
        


        if(request.affectedAreas) {
            for (const affectedArea of request.affectedAreas) {
                const newAffectedArea = new AffectedArea({
                    id: uuidv4(),
                    coordinates: affectedArea.coordinates,
                    disasterId: disaster.id,
                    name: affectedArea.name,
                    address: affectedArea.address,
                })

                await this.affectedAreaRepository.save(newAffectedArea);

                if(affectedArea.housingUnits) {
                    for (const housingUnit of affectedArea.housingUnits) {
                        const newHousingUnit = new HousingUnit({
                            id: uuidv4(),
                            affectedAreaId: newAffectedArea.id,
                        });

                        await this.housingUnitRepository.save(newHousingUnit);
                        
                        if(housingUnit.families) {
                            for (const family of housingUnit.families) {
                                const newFamily = new Family({
                                    id: uuidv4(),
                                    housingUnitId: newHousingUnit.id,
                                });
                                
                                await this.familyRepository.save(newFamily);

                                if(family.affecteds) {
                                    for (const affected of family.affecteds) {
                                        const newAffected = new Affected({
                                            id: uuidv4(),
                                            name: affected.name,
                                            age: affected.age,
                                            sex: affected.sex,
                                            cpf: affected.cpf,
                                            contact: affected.contact,
                                            hasCleanWaterAccess: affected.hasCleanWaterAccess,
                                            hasElectricityAccess: affected.hasElectricityAccess,
                                            canCook: affected.canCook,
                                            inParentOrFriendHouse: affected.inParentOrFriendHouse,
                                            inPublicShelter: affected.inPublicShelter,
                                            exCleanWater: affected.exCleanWater,
                                            exElectricity: affected.exElectricity,
                                            exParentOrFriendHouse: affected.exParentOrFriendHouse,
                                            exPublicShelter: affected.exPublicShelter,
                                            familyId: newFamily.id,

                                        })
                                        await this.affectedRepository.save(newAffected);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }


        return disaster;
    }
}