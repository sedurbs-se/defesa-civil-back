import { Controller, Get, Param } from '@nestjs/common';
import { ObterArea } from './ObterArea';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class GetAreaController {
  constructor(private readonly obterArea: ObterArea) {}

  @ApiResponse({ status: 200, description: 'A área foi encontrada' })
  @ApiResponse({
    status: 404,
    description:
      'A área não foi encontrada. Não existe uma area com o id informado',
  })
  @ApiResponse({ status: 500, description: 'Erro interno do servidor' })
  @Get('/area/:area_id')
  async execute(@Param('area_id') area_id: string) {
    const { area, affected_people_count, unity_count } =
      await this.obterArea.execute(area_id);
    return {
      area: {
        id: area.id,
        name: area.name,
        order: area.order,
        disasterId: area.disasterId,
        disaster: {
          id: area.disaster.id,
          date: area.disaster.date,
          cityId: area.disaster.cityId,
          city: {
            id: area.disaster.city.id,
            name: area.disaster.city.name,
          },
        },
        housingUnits: area.housingUnits.map((h) => ({
          id: h.id,
          order: h.order,
          address: h.address,
          coordinates: h.coordinates,
        })),
      },
      affected_people_count,
      unity_count,
    };
  }
}
