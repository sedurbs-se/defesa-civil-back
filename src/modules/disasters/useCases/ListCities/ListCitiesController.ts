import { ListCities } from './ListCities';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class ListCitiesController {
  constructor(private readonly listCities: ListCities) {}

  @Get('/cities')
  async execute() {
    const cities = await this.listCities.execute();

    return cities.map((city) => ({
      id: city.id,
      name: city.name,
    }));
  }
}
