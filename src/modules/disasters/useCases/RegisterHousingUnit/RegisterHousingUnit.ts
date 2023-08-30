import { AppError } from 'src/core/logic/error';
import { HousingUnit } from '../../domain/housingUnit/housing-unit';
import { CreateHousingUnitDTO } from '../../dtos/CreateHousingUnitDTO';
import { HousingUnitRepository } from '../../repositories/IHousingUnitRepository';
import { Injectable } from '@nestjs/common';
import { AffectedAreaRepository } from '../../repositories/IAffectedAreaRepository';

@Injectable()
class RegisterHousing {
  constructor(
    private housingUnitRepository: HousingUnitRepository,
    private affectedAreaRepository: AffectedAreaRepository,
  ) {}

  async execute(data: CreateHousingUnitDTO): Promise<HousingUnit> {
    const existArea = await this.affectedAreaRepository.find(
      data.affectedAreaId,
    );

    if (!existArea) throw new AppError('Area not found');

    const housingUnit = new HousingUnit({
      ...data,
      order: existArea.housingUnits.length + 1,
    });

    await this.housingUnitRepository.save(housingUnit);

    return housingUnit;
  }
}

export { RegisterHousing };
