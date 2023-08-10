import { Injectable } from '@nestjs/common';
import { HousingUnit } from '../../domain/housingUnit/housing-unit';
import { AffectedAreaRepository } from '../../repositories/IAffectedAreaRepository';
import { AffectedArea } from '../../domain/affectedArea/affected-area';

@Injectable()
export class GetArea {
  constructor(
    private readonly affectedAreaRepository: AffectedAreaRepository,
  ) {}

  async execute(area_id: string): Promise<AffectedArea> {
    return await this.affectedAreaRepository.find(area_id);
  }
}
