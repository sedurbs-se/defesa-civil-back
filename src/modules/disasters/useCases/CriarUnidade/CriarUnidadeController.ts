import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateHousingUnitDTO } from '../../dtos/CreateHousingUnitDTO';
import { CriarUnidade } from './CriarUnidade';
import { CARGOS } from '../../domain/usuario/usuario';
import { Roles } from 'src/core/decorators/roles.decorator';
import { RolesGuard } from 'src/core/guards/roles.guard';
import { Usuario } from '@prisma/client';
import { User } from 'src/core/decorators/user.decorator';

@UseGuards(RolesGuard)
@Controller()
export class CriarUnidadeController {
  constructor(private readonly criarUnidade: CriarUnidade) {}

  @Post('/housing-unit')
  @Roles(CARGOS.AGENT)
  async execute(@Body() body: CreateHousingUnitDTO, @User() user: Usuario) {
    const housingUnit = await this.criarUnidade.execute({
      ...body,
      id_usuario: user.id,
    });

    return {
      id: housingUnit.id,
      order: housingUnit.ordem,
      affectedAreaId: housingUnit.areaAfetadaId,
      address: housingUnit.endereco,
      coordinates: housingUnit.coordenadas,
      status_familia: housingUnit.status_familia,
      status_habitacao: housingUnit.status_habitacao,
    };
  }
}
