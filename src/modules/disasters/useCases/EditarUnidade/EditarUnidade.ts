import { OptionalExceptFor } from 'src/core/logic/OptionalExceptFor';
import {
  HousingUnit,
  HousingUnitProps,
} from '../../domain/housingUnit/housing-unit';
import { HousingUnitRepository } from '../../repositories/IHousingUnitRepository';
import { Injectable } from '@nestjs/common';

type EditarUnidadeRequest = OptionalExceptFor<HousingUnitProps, 'id'>;
@Injectable()
class EditarUnidade {
  constructor(private housingUnitRepository: HousingUnitRepository) {}

  async execute(request: EditarUnidadeRequest): Promise<HousingUnit> {
    const housingUnit = await this.housingUnitRepository.find(request.id);

    if (!housingUnit) {
      throw new Error('Housing Unit not found');
    }

    const mergedHousingUnit = { ...housingUnit, ...request };

    const updatedHousingUnit = new HousingUnit(
      mergedHousingUnit as HousingUnitProps,
    );

    await this.housingUnitRepository.update(updatedHousingUnit);

    return updatedHousingUnit;
  }
}

export { EditarUnidade, EditarUnidadeRequest };
