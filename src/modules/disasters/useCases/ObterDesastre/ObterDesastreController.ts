import { Controller, Get, Param } from '@nestjs/common';
import { ObterDesastre } from './ObterDesastre';

@Controller()
export class ObterDesastreController {
  constructor(private readonly obterDesastre: ObterDesastre) {}

  @Get('/disaster/:disaster_id')
  async execute(@Param('disaster_id') disaster_id: string) {
    const { disaster, affected_people_count, area_count, unity_count } =
      await this.obterDesastre.execute(disaster_id);
    return {
      disaster: {
        id: disaster.id,
        date: disaster.data,
        cityId: disaster.cidadeId,
        city: {
          id: disaster.cidade.id,
          name: disaster.cidade.nome,
        },
        areas: disaster.areasAfetadas.map((a) => ({
          id: a.id,
          name: a.nome,
          order: a.ordem,
        })),
      },
      affected_people_count,
      unity_count,
      area_count,
    };
  }
}
