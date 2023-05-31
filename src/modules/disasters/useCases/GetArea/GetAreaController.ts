import { Controller, Get, Param } from '@nestjs/common';
import { GetArea } from './GetArea';

@Controller()
export class GetAreaController {
  constructor(private readonly getArea: GetArea) {}

  @Get('/area/:area_id')
  async execute(@Param('area_id') area_id: string) {
    const areas = await this.getArea.execute(area_id);
    return {
      id: areas.id,
      name: areas.name,
      order: areas.order,
      housingUnits: areas.housingUnits.map((h) => ({
        id: h.id,
        order: h.order,
      })),
    }
  }
}
