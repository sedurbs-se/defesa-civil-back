import { Controller, Get, Param } from '@nestjs/common';
import { ListTeamAgents } from './ListTeamAgents';

@Controller()
export class ListTeamAgentsController {
  constructor(private listTeamAgents: ListTeamAgents) {}

  @Get('/team/agents/:id')
  async handle(@Param('id') id: string) {
    const response = await this.listTeamAgents.execute(id);

    return response;
  }
}
