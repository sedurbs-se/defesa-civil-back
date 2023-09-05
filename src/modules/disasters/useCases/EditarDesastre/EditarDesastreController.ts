import { Body, Controller, Param, Put } from '@nestjs/common';
import { EditarDesastre } from './EditarDesastre';
import { CreateDisasterDTO } from '../../dtos/CreateDisasterDTO';

@Controller()
export class EditarDesastreController {
  constructor(private readonly editarDesastre: EditarDesastre) {}

  @Put('/disaster/:id')
  async execute(@Body() body: CreateDisasterDTO, @Param('id') id: string) {
    const d = await this.editarDesastre.execute(body, id);
    return {
      id: d.id,
      date: d.data,
      cityId: d.cidadeId,
    };
  }
}
