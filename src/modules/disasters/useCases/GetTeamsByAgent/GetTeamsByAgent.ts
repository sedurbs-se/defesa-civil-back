import { Injectable } from '@nestjs/common';
import { ITeamRepository } from '../../repositories/ITeamRepository';
import { IAgentRepository } from '../../repositories/IAgentRepository';
import { AppError } from 'src/core/logic/error';

@Injectable()
export class GetTeamsByAgent {
  constructor(private readonly teamsRepositories: ITeamRepository,private readonly agentRepository: IAgentRepository) {}

  async execute(agent_id: string) {

    const a = await this.agentRepository.getById(agent_id);

    if(!a) throw new AppError("Agente não encontrado", 404)

    const teams = await this.teamsRepositories.findByAgentId(agent_id);

    return teams;
  }
}
