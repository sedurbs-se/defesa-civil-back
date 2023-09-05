import { Controller, Get, Param } from '@nestjs/common';
import { GetTeamsByAgent } from './GetTeamsByAgent';

@Controller()
export class GetTeamsByAgentController {
  constructor(private getTeamsByAgent: GetTeamsByAgent) {}

  @Get('/agent/team/:id')
  async handle(@Param('id') id: string) {
    const team = await this.getTeamsByAgent.execute(id);

    return team.map((team) => ({
      id: team.id,
      name: team.name,
      affectedAreaId: team.affected_area_id,
      leaderId: team.lider_id,
      area: {
        id: team.affected_area.id,
        name: team.affected_area.name,
        order: team.affected_area.order,
        disasterId: team.affected_area.disasterId,
      },
      agents: team.agents.map((agent) => ({
        id: agent.id,
        user_id: agent.user_id,
        contact: agent.contact,
        function: agent.function,
        leader_team: agent.fl_lider_equipe,
      })),
    }));
  }
}
