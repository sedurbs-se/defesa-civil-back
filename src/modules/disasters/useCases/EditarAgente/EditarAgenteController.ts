import { Body, Controller, Param, Put } from '@nestjs/common';
import { EditarAgente } from './EditarAgente';
import { EditAgentDTO } from '../../dtos/EditAgentDTO';
import { Agent } from '../../domain/agent/agent';

@Controller()
export class EditAgentController {
  constructor(private editarAgente: EditarAgente) {}

  @Put('/agent/:id')
  async handle(@Param('id') id: string, @Body() body: EditAgentDTO) {
    const agent = new Agent(body);
    await this.editarAgente.execute({ id, agent });
  }
}
