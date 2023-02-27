import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { AffectedArea } from "../../domain/affectedArea/affected-area";
import { AffectedAreaRepository } from "../../repositories/IAffectedAreaRepository";

interface CreateAffectedAreaRequest {
    coordinates: number[];
    disasterId: string;
    name: string;
    address: string;
}

@Injectable()
class CreateAffectedArea {
    constructor(private affectedAreaRepository: AffectedAreaRepository) {}

    async execute(request: CreateAffectedAreaRequest): Promise<AffectedArea> {
        const affectedArea = new AffectedArea({
            id: uuidv4(),
            coordinates: request.coordinates,
            disasterId: request.disasterId,
            name: request.name,
            address: request.address,
        });

        await this.affectedAreaRepository.save(affectedArea);

        return affectedArea;
    }
}

export {
    CreateAffectedArea,
    CreateAffectedAreaRequest
}