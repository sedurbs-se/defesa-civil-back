import { Disaster } from '../../domain/disaster/disaster';
import { DisasterRepository } from '../../repositories/IDisasterRepository';
import { CreateDisasterDTO } from '../../dtos/CreateDisasterDTO';
import { CityRepository } from '../../repositories/ICityRepository';
import { AppError } from 'src/core/logic/error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EditDisaster {
  constructor(
    private disasterRepository: DisasterRepository,
    private cityRepository: CityRepository,
  ) {}

  async execute(request: CreateDisasterDTO, id: string): Promise<Disaster> {
    const existDisaster = await this.disasterRepository.find(id);

    if (!existDisaster) throw new AppError('Desastre não encontrado!', 404);

    const city = await this.cityRepository.find(request.cityId);

    if (!city) throw new AppError('Município não encontrado!', 400);

    const disaster = new Disaster({
      id: existDisaster.id,
      cityId: request.cityId,
      date: new Date(request.date),
    });

    await this.disasterRepository.update(disaster);

    return disaster;
  }
}
