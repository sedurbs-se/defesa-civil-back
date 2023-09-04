import { Injectable } from '@nestjs/common';
import { AcaoRepository } from '../../repositories/AcaoRepository';

interface ListActionsRequest {
  housingUnitId?: string;
  affectedAreaId?: string;
}

@Injectable()
export class ListActions {
  constructor(private readonly acaoRepository: AcaoRepository) {}

  async execute(request: ListActionsRequest) {
    return await this.acaoRepository.findAll({
      areaAfetadaId: request.affectedAreaId,
      unidadeHabitacionalId: request.housingUnitId,
    });
  }
}
