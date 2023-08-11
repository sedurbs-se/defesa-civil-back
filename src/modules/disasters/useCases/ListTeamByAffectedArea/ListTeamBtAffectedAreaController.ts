import { Controller, Get, Param } from '@nestjs/common';
import { ListTeamBtAffectedArea } from './ListTeamBtAffectedArea';

@Controller()
export class ListTeamBtAffectedAreaController {
  constructor(private listTeams: ListTeamBtAffectedArea) {}

  @Get('/team/:id')
  async handle(@Param('id') id: string) {
    const teams = await this.listTeams.execute(id);

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
