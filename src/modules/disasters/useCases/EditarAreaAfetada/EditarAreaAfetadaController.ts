import { Body, Controller, Put, Param } from '@nestjs/common';
import { CreateAffectedAreaDTO } from '../../dtos/CreateAffectedAreaDTO';
import { EditarAreaAfetada } from './EditarAreaAfetada';

@Controller()
export class EditAreaController {
  constructor(private readonly editarAreaAfetada: EditarAreaAfetada) {}

  @Put('/area/:id')
  async execute(@Body() body: CreateAffectedAreaDTO, @Param('id') id: string) {
    const affectedArea = await this.editarAreaAfetada.execute({
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
