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
      fl_danificado: housingUnit.fl_danificado,
      fl_desabrigado: housingUnit.fl_desabrigado,
      fl_desalojado: housingUnit.fl_desalojado,
      fl_destroido: housingUnit.fl_destroido,
      fl_resiliente: housingUnit.fl_resiliente,
      fl_resistente: housingUnit.fl_resistente,
    };
  }
}
