import { Injectable } from '@nestjs/common';
import { Desastre } from '../../domain/desastre/desastre';
import { DesastreRepository } from '../../repositories/DesastreRepository';

export interface DisasterWithDetails {
  disaster: Desastre;
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
  area_count: number;
}

@Injectable()
export class ObterDesastre {
  constructor(private readonly disasterRepository: DesastreRepository) {}

  async execute(disaster_id: string): Promise<DisasterWithDetails> {
    return await this.disasterRepository.getDisasterDetails(disaster_id);
  }
}
