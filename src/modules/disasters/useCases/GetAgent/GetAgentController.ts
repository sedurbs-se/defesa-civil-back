import { Controller, Get, Param } from '@nestjs/common';
import { GetAgent } from './GetAgent';

@Controller()
export class GetAgentController {
  constructor(private getAgent: GetAgent) {}

  @Get('/agent/:id')
  async handle(@Param('id') id: string) {
    const response = await this.getAgent.execute(id);

    if (!response) return {};

    return {
      id: response.id,
      user_id: response.user_id,
      function: response.function,
      contact: response.contact,
      name: response.user.name,
      cpf: response.user.cpf,
    };
  }
}
