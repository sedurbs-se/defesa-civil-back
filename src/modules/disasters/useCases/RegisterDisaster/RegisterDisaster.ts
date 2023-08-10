import { Disaster } from '../../domain/disaster/disaster';
import { DisasterRepository } from '../../repositories/IDisasterRepository';
import { CreateDisasterDTO } from '../../dtos/CreateDisasterDTO';
import { CityRepository } from '../../repositories/ICityRepository';
import { AppError } from 'src/core/logic/error';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RegisterDisaster {
  constructor(
    private disasterRepository: DisasterRepository,
    private cityRepository: CityRepository,
  ) {}

  async execute(request: CreateDisasterDTO): Promise<Disaster> {
    const city = await this.cityRepository.find(request.cityId);

    if (!city) throw new AppError('Município não encontrado!', 400);

    const disaster = new Disaster({
      id: uuidv4(),
      cityId: request.cityId,
      date: new Date(request.date),
    });

    await this.disasterRepository.save(disaster);

    return disaster;
  }
}
