import { Controller, Get, Param } from '@nestjs/common';
import { GetArea } from './GetArea';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class GetAreaController {
  constructor(private readonly getArea: GetArea) {}

  @ApiResponse({ status: 200, description: 'A área foi encontrada' })
  @ApiResponse({
    status: 404,
    description:
      'A área não foi encontrada. Não existe uma area com o id informado',
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Get('/area/:area_id')
  async execute(@Param('area_id') area_id: string) {
    const areas = await this.getArea.execute(area_id);
    return {
      id: areas.id,
      name: areas.name,
      order: areas.order,
      disasterId: areas.disasterId,
      disaster: {
        id: areas.disaster.id,
        date: areas.disaster.date,
        cityId: areas.disaster.cityId,
        city: {
          id: areas.disaster.city.id,
          name: areas.disaster.city.name,
        },
      },
      housingUnits: areas.housingUnits.map((h) => ({
        id: h.id,
        order: h.order,
      })),
    };
  }
}
