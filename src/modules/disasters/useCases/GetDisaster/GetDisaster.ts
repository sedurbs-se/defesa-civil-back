import { Injectable } from '@nestjs/common';
import { Disaster } from '../../domain/disaster/disaster';
import { DisasterRepository } from '../../repositories/IDisasterRepository';

export interface DisasterWithDetails {
  disaster: Disaster;
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
  }
  area_count: number;
}

@Injectable()
export class GetDisaster {
  constructor(private readonly disasterRepository: DisasterRepository) {}

  async execute(disaster_id: string): Promise<DisasterWithDetails> {
    return await this.disasterRepository.getDisasterDetails(disaster_id);
  }
}
