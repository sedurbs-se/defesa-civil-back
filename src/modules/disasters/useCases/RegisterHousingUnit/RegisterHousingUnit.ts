import { AppError } from 'src/core/logic/error';
import { HousingUnit } from '../../domain/housingUnit/housing-unit';
import { CreateHousingUnitDTO } from '../../dtos/CreateHousingUnitDTO';
import { HousingUnitRepository } from '../../repositories/IHousingUnitRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
class RegisterHousing {
  constructor(private housingUnitRepository: HousingUnitRepository) {}

  async execute(data: CreateHousingUnitDTO): Promise<HousingUnit> {

    const existWithOrder = await this.housingUnitRepository.findByOrdem(data.order);
    if (existWithOrder) {
      throw new AppError('Já existe uma unidade habitacional com essa ordem');
    }

    const housingUnit = new HousingUnit({
      ...data,
    });
    
    console.log(housingUnit)

    await this.housingUnitRepository.save(housingUnit);

    return housingUnit;
  }
}

export { RegisterHousing };
