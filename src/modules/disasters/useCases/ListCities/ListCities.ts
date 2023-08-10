import { City } from '../../domain/city/city';
import { CityRepository } from '../../repositories/ICityRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListCities {
  constructor(private readonly cityRepository: CityRepository) {}

  async execute(): Promise<City[]> {
    return await this.cityRepository.findAll();
  }
}
