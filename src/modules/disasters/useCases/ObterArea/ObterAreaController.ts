import { Controller, Get, Param } from '@nestjs/common';
import { ObterArea } from './ObterArea';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class ObterAreaController {
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
        name: area.nome,
        order: area.ordem,
        disasterId: area.desastreId,
        disaster: {
          id: area.desastre.id,
          date: area.desastre.data,
          cityId: area.desastre.cidadeId,
          city: {
            id: area.desastre.cidade.id,
            name: area.desastre.cidade.nome,
          },
        },
        housingUnits: area.unidadesHabitacionais.map((h) => ({
          id: h.id,
          order: h.ordem,
          address: h.endereco,
          coordinates: h.coordenadas,
        })),
      },
      affected_people_count,
      unity_count,
    };
  }
}
