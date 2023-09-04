import { Body, Controller, Param, Put } from '@nestjs/common';
import { EditAgent } from './EditAgent';
import { EditAgentDTO } from '../../dtos/EditAgentDTO';
import { Agent } from '../../domain/agent/agent';

@Controller()
export class EditAgentController {
  constructor(private editAgent: EditAgent) {}

  @Put('/agent/:id')
  async handle(@Param('id') id: string, @Body() body: EditAgentDTO) {
    const agent = new Agent(body);
    await this.editAgent.execute({ id, agent });
  }
}
