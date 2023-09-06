import { Controller, Get, Param } from '@nestjs/common';
import { ObterEquipePorAgente } from './ObterEquipePorAgente';

@Controller()
export class ObterEquipePorAgenteController {
  constructor(private service: ObterEquipePorAgente) {}

  @Get('/agent/teams/:id')
  async handle(@Param('id') id: string) {
    const equipe = await this.service.execute(id);
    console.log(equipe[0].areaAfetada)
    return equipe.map((equipe) => ({
      id: equipe.id,
      name: equipe.name,
      affectedAreaId: equipe.areaAfetadaId,
      leaderId: equipe.lider_id,
      affectedArea: {
        id: equipe.areaAfetada.id,
        name: equipe.areaAfetada.nome,
        order: equipe.areaAfetada.ordem,
        disasterId: equipe.areaAfetada.desastreId,
      },
      agents: equipe.agentes.map((agent) => ({
        id: agent.id,
        user_id: agent.usuarioId,
        contact: agent.contato,
        function: agent.funcao,
        leader_equipe: agent.fl_lider_equipe,
      })),
    }));
  }
}
