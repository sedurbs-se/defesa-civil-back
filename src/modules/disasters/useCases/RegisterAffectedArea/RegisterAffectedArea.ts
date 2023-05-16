import { Injectable } from "@nestjs/common";
import { AffectedArea } from "../../domain/affectedArea/affected-area";
import { AffectedAreaRepository } from "../../repositories/IAffectedAreaRepository";
import { AppError } from "src/core/logic/error";
import { CreateAffectedAreaDTO } from "../../dtos/CreateAffectedAreaDTO";
import { DisasterRepository } from "../../repositories/IDisasterRepository";

@Injectable()
class CreateAffectedArea {
    constructor(private affectedAreaRepository: AffectedAreaRepository,
        private disasterRepository: DisasterRepository
        ) {}

    async execute(request: CreateAffectedAreaDTO): Promise<AffectedArea> {

        const existDisaster = await this.disasterRepository.find(request.disasterId);

        if (!existDisaster) throw new AppError("Disaster not found");

        const existAffectedArea = await this.affectedAreaRepository.findByOrder(request.order);

        if (existAffectedArea) throw new AppError("Affected Area already exists");

        const affectedArea = new AffectedArea({
            disasterId: request.disasterId,
            name: request.name,
            order: request.order
        });

        await this.affectedAreaRepository.save(affectedArea);

        return affectedArea;
    }
}

export {
    CreateAffectedArea
}