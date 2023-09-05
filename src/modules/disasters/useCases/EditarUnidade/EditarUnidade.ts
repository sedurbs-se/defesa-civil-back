import { OptionalExceptFor } from 'src/core/logic/OptionalExceptFor';
import {
  UnidadeHabitacional,
  UnidadeHabitacionalProps,
} from '../../domain/unidadeHabitacional/unidade-habitacional';
import { UnidadeHabitacionalRepository } from '../../repositories/UnidadeHabitacionalRepository';
import { Injectable } from '@nestjs/common';

type EditarUnidadeRequest = OptionalExceptFor<UnidadeHabitacionalProps, 'id'>;
@Injectable()
class EditarUnidade {
  constructor(private unidadeRepository: UnidadeHabitacionalRepository) {}

  async execute(request: EditarUnidadeRequest): Promise<UnidadeHabitacional> {
    const housingUnit = await this.unidadeRepository.find(request.id);

    if (!housingUnit) {
      throw new Error('Housing Unit not found');
    }

    const mergedHousingUnit = { ...housingUnit, ...request };

    const updatedHousingUnit = new UnidadeHabitacional(
      mergedHousingUnit as UnidadeHabitacionalProps,
    );

    await this.unidadeRepository.update(updatedHousingUnit);

    return updatedHousingUnit;
  }
}

export { EditarUnidade, EditarUnidadeRequest };
