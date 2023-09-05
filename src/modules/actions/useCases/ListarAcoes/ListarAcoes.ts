import { Injectable } from '@nestjs/common';
import { AcaoRepository } from '../../repositories/AcaoRepository';

interface ListarAcoesRequest {
  housingUnitId?: string;
  affectedAreaId?: string;
}

@Injectable()
export class ListarAcoes {
  constructor(private readonly acaoRepository: AcaoRepository) {}

  async execute(request: ListarAcoesRequest) {
    return await this.acaoRepository.findAll({
      areaAfetadaId: request.affectedAreaId,
      unidadeHabitacionalId: request.housingUnitId,
    });
  }
}
