import { Injectable } from '@nestjs/common';
import { IAgentRepository } from '../../repositories/IAgentRepository';
import { Agent } from '../../domain/agent/agent';

@Injectable()
export class ListarAgentes {
  constructor(private agentRepository: IAgentRepository) {}

  async execute() {
    const agents = await this.agentRepository.find();

    return {
      agents: agents.map((agent: Agent) => ({
        id: agent.id,
        user_id: agent.user_id,
        cpf: agent.user.cpf,
        name: agent.user.name,
        contact: agent.contact,
        function: agent.function,
        leader_team: agent.fl_lider_equipe,
      })),
    };
  }
}
