import { Injectable } from "@nestjs/common";
import { OptionalExceptFor } from "src/core/logic/OptionalExceptFor";
import { AffectedArea } from "../../domain/affectedArea/affected-area";
import { AffectedAreaRepository } from "../../repositories/IAffectedAreaRepository";

type EditAffectedAreaRequest = OptionalExceptFor<AffectedArea, 'id'>

@Injectable()
export class EditAffectedArea {
    constructor(private affectedAreaRepository: AffectedAreaRepository) {}

    async execute(request: EditAffectedAreaRequest): Promise<AffectedArea> {

        const affectedArea = await this.affectedAreaRepository.find(request.id);

        if (!affectedArea) {
            throw new Error('Affected Area not found');
        }

        const mergedAffectedArea = { ...affectedArea, ...request };

        const updatedAffectedArea = new AffectedArea(mergedAffectedArea as AffectedArea)

        await this.affectedAreaRepository.save(updatedAffectedArea);

        return updatedAffectedArea;
    }
}