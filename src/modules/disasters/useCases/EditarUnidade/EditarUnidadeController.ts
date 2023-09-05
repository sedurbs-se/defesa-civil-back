import { Body, Controller, Param, Put } from '@nestjs/common';

import { EditarUnidade } from './EditarUnidade';
import { CreateHousingUnitDTO } from '../../dtos/CreateHousingUnitDTO';

@Controller()
export class EditarUnidadeController {
  constructor(private readonly editarUnidade: EditarUnidade) {}

  @Put('/housing-unit/:unit_id')
  async execute(
    @Body() body: CreateHousingUnitDTO,
    @Param('unit_id') id: string,
  ) {
    const d = await this.editarUnidade.execute({
      ...body,
      id,
    });
    return {
      id: d.id,
    };
  }
}
