import { AppError } from "src/core/logic/error";
import { AffectedAreaRepository } from "../../repositories/IAffectedAreaRepository";
import { ITeamRepository } from "../../repositories/ITeamRepository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ListTeamBtAffectedArea {
    constructor(
        private affectedAreaRepository: AffectedAreaRepository,
        private teamRepository: ITeamRepository,
    ) {}

    async execute(affectedAreaId: string) {
        const affectedArea = await this.affectedAreaRepository.find(affectedAreaId);

        if(!affectedArea) {
            throw new AppError('Area not found');
        }

        const teams = await this.teamRepository.findByAffectedAreaId(affectedAreaId);

        return teams;
    }
}