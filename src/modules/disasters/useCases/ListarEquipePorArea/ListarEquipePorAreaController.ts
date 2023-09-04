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
      affectedAreaId: t.affected_area_id,
      leaderId: t.lider_id,
      agents: t.agents.map((a) => ({
        id: a.id,
        contact: a.contact,
        function: a.function,
      })),
    }));
  }
}
