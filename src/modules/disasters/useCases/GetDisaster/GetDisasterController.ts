import { Controller, Get, Param } from '@nestjs/common';
import { GetDisaster } from './GetDisaster';

@Controller()
export class GetDisasterController {
  constructor(private readonly getDisaster: GetDisaster) {}

  @Get('/disaster/:disaster_id')
  async execute(@Param('disaster_id') disaster_id: string) {
    const { disaster, affected_people_count, area_count, unity_count } =
      await this.getDisaster.execute(disaster_id);
    return {
      disaster: {
        id: disaster.id,
        date: disaster.date,
        cityId: disaster.cityId,
        city: {
          id: disaster.city.id,
          name: disaster.city.name,
        },
        areas: disaster.affectedAreas.map((a) => ({
          id: a.id,
          name: a.name,
          order: a.order,
        })),
      },
      affected_people_count,
      unity_count,
      area_count,
    };
  }
}
