import { HousingUnit } from '../../domain/housingUnit/housing-unit';
import { HousingUnitRepository } from '../../repositories/IHousingUnitRepository';

interface CreateHousingUnitRequest {
  affectedAreaId: string;
  address: string;
  coordinates: number[];
}

class CreateHousingUnit {
  constructor(private housingUnitRepository: HousingUnitRepository) {}

  async execute(request: CreateHousingUnitRequest): Promise<HousingUnit> {
    const housingUnit = new HousingUnit({
      address: request.address,
      coordinates: request.coordinates,
      affectedAreaId: request.affectedAreaId,
    });

    await this.housingUnitRepository.save(housingUnit);

    return housingUnit;
  }
}

export { CreateHousingUnit, CreateHousingUnitRequest };
