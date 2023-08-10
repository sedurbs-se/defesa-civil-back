import { Body, Controller, Post, Param } from '@nestjs/common';
import { EditDisaster } from './EditDisaster';
import { CreateDisasterDTO } from '../../dtos/CreateDisasterDTO';
import { Disaster } from '../../domain/disaster/disaster';

@Controller()
export class EditDisasterController {
  constructor(private readonly editDisaster: EditDisaster) {}

  @Post('/disaster/:id')
  async execute(
    @Body() body: CreateDisasterDTO,
    @Param('id') id: string,
  ): Promise<Disaster> {
    return await this.editDisaster.execute(body, id);
  }
}
