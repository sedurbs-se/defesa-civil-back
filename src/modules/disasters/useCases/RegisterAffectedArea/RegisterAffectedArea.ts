import { Injectable } from "@nestjs/common";
import { AffectedArea } from "../../domain/affectedArea/affected-area";
import { AffectedAreaRepository } from "../../repositories/IAffectedAreaRepository";
import { AppError } from "src/core/logic/error";
import { CreateAffectedAreaDTO } from "../../dtos/CreateAffectedAreaDTO";


@Injectable()
class CreateAffectedArea {
    constructor(private affectedAreaRepository: AffectedAreaRepository) {}

    async execute(request: CreateAffectedAreaDTO): Promise<AffectedArea> {

        const existDisaster = await this.affectedAreaRepository.find(request.disasterId);

        if (!existDisaster) throw new AppError("Disaster not found");

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