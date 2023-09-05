import { Injectable } from '@nestjs/common';
import { AgenteRepository } from '../../repositories/AgenteRepository';
import { Agente } from '../../domain/agente/agente';

@Injectable()
export class ListarAgentes {
  constructor(private agentRepository: AgenteRepository) {}

  async execute() {
    const agents = await this.agentRepository.find();

    return {
      agents: agents.map((agente: Agente) => ({
        id: agente.id,
        user_id: agente.usuarioId,
        cpf: agente.user.cpf,
        name: agente.user.nome,
        contact: agente.contato,
        function: agente.funcao,
        leader_team: agente.fl_lider_equipe,
      })),
    };
  }
}
