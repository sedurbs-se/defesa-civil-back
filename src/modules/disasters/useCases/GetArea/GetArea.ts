import { Injectable } from '@nestjs/common';
import { AffectedAreaRepository } from '../../repositories/IAffectedAreaRepository';
import { AffectedArea } from '../../domain/affectedArea/affected-area';


export interface AffectedAreaWithDetails {
  area:AffectedArea;
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
}

@Injectable()
export class GetArea {
  constructor(
    private readonly affectedAreaRepository: AffectedAreaRepository,
  ) {}

  async execute(area_id: string): Promise<AffectedAreaWithDetails> {
    return await this.affectedAreaRepository.findWithDetails(area_id);
  }
}
