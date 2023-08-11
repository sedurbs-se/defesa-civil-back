import { Controller, Get } from '@nestjs/common';
import { ListAgents } from './ListAgents';

@Controller()
export class ListAgentsController {
  constructor(private listAgents: ListAgents) {}

  @Get('/agent')
  async handle() {
    const response = await this.listAgents.execute();

    return response;
  }
}
