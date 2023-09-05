import { AppError } from 'src/core/logic/error';
import { AreaAfetadaRepository } from '../../repositories/AreaAfetadaRepository';
import { EquipeRepository } from '../../repositories/EquipeRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListarEquipePorArea {
  constructor(
    private affectedAreaRepository: AreaAfetadaRepository,
    private teamRepository: EquipeRepository,
  ) {}

  async execute(affectedAreaId: string) {
    const affectedArea = await this.affectedAreaRepository.find(affectedAreaId);

    if (!affectedArea) {
      throw new AppError('Area not found');
    }

    const teams = await this.teamRepository.findByAffectedAreaId(
      affectedAreaId,
    );

    return teams;
  }
}
