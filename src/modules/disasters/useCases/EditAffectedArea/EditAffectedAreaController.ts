import { Body, Controller, Put, Param } from '@nestjs/common';
import { CreateAffectedAreaDTO } from '../../dtos/CreateAffectedAreaDTO';
import { EditAffectedArea } from './EditAffectedArea';

@Controller()
export class EditAreaController {
  constructor(private readonly createAffectedArea: EditAffectedArea) {}

  @Put('/area/:id')
  async execute(@Body() body: CreateAffectedAreaDTO, @Param('id') id: string) {
    const affectedArea = await this.createAffectedArea.execute({
      ...body,
      id,
    });

    return {
      id: affectedArea.id,
      name: affectedArea.name,
      order: affectedArea.order,
      disasterId: affectedArea.disasterId,
    };
  }
}
