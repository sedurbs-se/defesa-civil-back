import { Injectable } from '@nestjs/common';
import { IAgentRepository } from '../../repositories/IAgentRepository';
import { Agent } from '../../domain/agent/agent';

interface EditarAgenteRequest {
  id: string;
  agent: Agent;
}

@Injectable()
export class EditarAgente {
  constructor(private readonly agentRepository: IAgentRepository) {}

  async execute({ agent }: EditarAgenteRequest): Promise<void> {
    await this.agentRepository.update(agent);
  }
}
