import { Body, Controller, Put, Param, UseGuards } from '@nestjs/common';
import { CreateAffectedAreaDTO } from '../../dtos/CreateAffectedAreaDTO';
import { EditarAreaAfetada } from './EditarAreaAfetada';
import { Roles } from 'src/core/decorators/roles.decorator';
import { CARGOS, Usuario } from '../../domain/usuario/usuario';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { User } from 'src/core/decorators/user.decorator';

@UseGuards(RolesGuard)
@Controller()
export class EditarAreaAfetadaController {
  constructor(private readonly editarAreaAfetada: EditarAreaAfetada) {}

  @Put('/area/:id')
  @Roles(CARGOS.AGENT)
  async execute(
    @Body() body: CreateAffectedAreaDTO,
    @Param('id') id: string,
    @User() user: Usuario,
  ) {
    const affectedArea = await this.editarAreaAfetada.execute({
      ...body,
      id,
      id_usuario: user.id,
    });

    return {
      id: affectedArea.id,
      name: affectedArea.nome,
      order: affectedArea.ordem,
      disasterId: affectedArea.desastreId,
    };
  }
}
