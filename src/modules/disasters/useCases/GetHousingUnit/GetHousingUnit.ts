import { Injectable } from '@nestjs/common';
import { HousingUnit } from '../../domain/housingUnit/housing-unit';
import { HousingUnitRepository } from '../../repositories/IHousingUnitRepository';

@Injectable()
export class GetHousingUnit {
  constructor(private readonly housingUnitRepository: HousingUnitRepository) {}

  async execute(unit_id: string): Promise<HousingUnit> {
    return await this.housingUnitRepository.find(unit_id);
  }
}
