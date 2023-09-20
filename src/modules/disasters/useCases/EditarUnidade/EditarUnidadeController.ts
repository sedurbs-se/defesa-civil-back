import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { EditarUnidade } from './EditarUnidade';
import { CreateHousingUnitDTO } from '../../dtos/CreateHousingUnitDTO';
import { Usuario } from '@prisma/client';
import { User } from 'src/core/decorators/user.decorator';
import { CARGOS } from '../../domain/usuario/usuario';
import { Roles } from 'src/core/decorators/roles.decorator';
import { RolesGuard } from 'src/core/guards/roles.guard';

@UseGuards(RolesGuard)
@Controller()
export class EditarUnidadeController {
  constructor(private readonly editarUnidade: EditarUnidade) {}

  @Put('/housing-unit/:unit_id')
  @Roles(CARGOS.AGENT)
  async execute(
    @Body() body: CreateHousingUnitDTO,
    @Param('unit_id') id: string,
    @User() user: Usuario,
  ) {
    
    const d = await this.editarUnidade.execute(
      {
        ...body,
        id_usuario: user.id,
      },
      id,
    );

    return {
      id: d.id,
    };
  }
}
