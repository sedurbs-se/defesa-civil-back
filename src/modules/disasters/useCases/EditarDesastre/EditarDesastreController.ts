import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { EditarDesastre } from './EditarDesastre';
import { CreateDisasterDTO } from '../../dtos/CreateDisasterDTO';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { CARGOS, Usuario } from '../../domain/usuario/usuario';
import { Roles } from 'src/core/decorators/roles.decorator';
import { User } from 'src/core/decorators/user.decorator';

@UseGuards(RolesGuard)
@Controller()
export class EditarDesastreController {
  constructor(private readonly editarDesastre: EditarDesastre) {}

  @Put('/disaster/:id')
  @Roles(CARGOS.AGENT)
  async execute(
    @Body() body: CreateDisasterDTO,
    @Param('id') id: string,
    @User() user: Usuario,
  ) {
    const d = await this.editarDesastre.execute(
      {
        ...body,
        id_usuario: user.id,
      },
      id,
    );
    return {
      id: d.id,
      date: d.data,
      cityId: d.cidadeId,
    };
  }
}
