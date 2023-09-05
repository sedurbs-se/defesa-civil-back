import { Controller, Get, Param } from '@nestjs/common';
import { ListarEquipePorArea } from './ListarEquipePorArea';

@Controller()
export class ListarEquipePorAreaController {
  constructor(private listarEquipesArea: ListarEquipePorArea) {}

  @Get('/team/:id')
  async handle(@Param('id') id: string) {
    const teams = await this.listarEquipesArea.execute(id);

    return teams.map((t) => ({
      id: t.id,
      name: t.name,
      affectedAreaId: t.areaAfetadaId,
      leaderId: t.lider_id,
      agents: t.agentes.map((a) => ({
        id: a.id,
        contact: a.contato,
        function: a.funcao,
      })),
    }));
  }
}
