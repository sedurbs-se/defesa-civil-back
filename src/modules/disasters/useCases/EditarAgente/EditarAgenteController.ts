import { Body, Controller, Param, Put } from '@nestjs/common';
import { EditarAgente } from './EditarAgente';
import { EditAgentDTO } from '../../dtos/EditAgentDTO';
import { Agente } from '../../domain/agente/agente';

@Controller()
export class EditarAgenteController {
  constructor(private editarAgente: EditarAgente) {}

  @Put('/agent/:id')
  async handle(@Param('id') id: string, @Body() body: EditAgentDTO) {
    const agent = new Agente({
      id: id,
      contato: body.contact,
      funcao: body.function,
      usuarioId: body.user_id,
    });
    await this.editarAgente.execute({ id, agent });
  }
}
