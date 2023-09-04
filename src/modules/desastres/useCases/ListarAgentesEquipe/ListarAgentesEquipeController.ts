import { Controller, Get, Param } from '@nestjs/common';
import { ListarAgentesEquipe } from './ListarAgentesEquipe';

@Controller()
export class ListarAgentesEquipeController {
  constructor(private listarAgentesEquipe: ListarAgentesEquipe) {}

  @Get('/team/agents/:id')
  async handle(@Param('id') id: string) {
    const response = await this.listarAgentesEquipe.execute(id);

    return response;
  }
}
