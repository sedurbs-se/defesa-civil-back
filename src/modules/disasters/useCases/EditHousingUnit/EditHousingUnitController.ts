import { Body, Controller, Param, Put } from '@nestjs/common';

import { EditHousingUnit } from './EditHousingUnit';
import { CreateHousingUnitDTO } from '../../dtos/CreateHousingUnitDTO';

@Controller()
export class EditHousingUnitController {
  constructor(private readonly editHousingUnit: EditHousingUnit) {}

  @Put('/housing-unit/:unit_id')
  async execute(
    @Body() body: CreateHousingUnitDTO,
    @Param('unit_id') id: string,
  ) {
    const d = await this.editHousingUnit.execute({
      ...body,
      id,
    });
    return {
      id: d.id,
    };
  }
}
