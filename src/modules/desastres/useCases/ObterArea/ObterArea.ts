import { Injectable } from '@nestjs/common';
import { AreaAfetadaRepository } from '../../repositories/AreaAfetadaRepository';
import { AreaAfetada } from '../../domain/areaAfetada/area-afetada';

export interface AffectedAreaWithDetails {
  area: AreaAfetada;
  affected_people_count: {
    qtd_pessoas: number;
    qtd_idosos: number;
    qtd_adultos: number;
    qtd_criancas: number;
    qtd_adolescente: number;
  };
  unity_count: {
    resilientes: number;
    desabrigados: number;
    desalojados: number;

    danificados: number;
    destruidos: number;
    resistentes: number;

    count: number;
  };
}

@Injectable()
export class ObterArea {
  constructor(private readonly areaAfetadaRepository: AreaAfetadaRepository) {}

  async execute(area_id: string): Promise<AffectedAreaWithDetails> {
    return await this.areaAfetadaRepository.findWithDetails(area_id);
  }
}
