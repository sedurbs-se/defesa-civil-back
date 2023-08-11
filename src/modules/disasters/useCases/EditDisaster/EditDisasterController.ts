import { Body, Controller, Param, Put } from '@nestjs/common';
import { EditDisaster } from './EditDisaster';
import { CreateDisasterDTO } from '../../dtos/CreateDisasterDTO';

@Controller()
export class EditDisasterController {
  constructor(private readonly editDisaster: EditDisaster) {}

  @Put('/disaster/:id')
  async execute(@Body() body: CreateDisasterDTO, @Param('id') id: string) {
    const d = await this.editDisaster.execute(body, id);
    return {
      id: d.id,
      date: d.date,
      cityId: d.cityId,
    };
  }
}
