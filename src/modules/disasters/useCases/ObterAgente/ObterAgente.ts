import { Injectable } from '@nestjs/common';
import { IAgentRepository } from '../../repositories/IAgentRepository';
import { Agent } from '../../domain/agent/agent';

@Injectable()
export class ObterAgente {
  constructor(private readonly agentRepository: IAgentRepository) {}

  async execute(id: string): Promise<Agent> {
    return await this.agentRepository.getById(id);
  }
}
