import { Controller, Get } from '@nestjs/common';
import { ListDisasters } from './ListDisasters';

@Controller()
export class ListDisastersController {
  constructor(private readonly listDisasters: ListDisasters) {}

  @Get('/disasters')
  async execute() {
    const disasters = await this.listDisasters.execute();
    return disasters.map((d) => ({
      id: d.id,
      date: d.date,
      cityId: d.cityId,
      city: {
        id: d.city.id,
        name: d.city.name,
      },
      // areas: d.affectedAreas.map((a) => ({
      //     id: a.id,
      //     name: a.name,
      // }))
    }));
  }
}
