import { Injectable } from '@nestjs/common';
import { IAgentRepository } from '../../repositories/IAgentRepository';
import { Agent } from '../../domain/agent/agent';
import { AgentMapper } from '../../mappers/AgentMapper';

interface EditAgentRequest {
  id: string;
  agent: Agent;
}

@Injectable()
export class EditAgent {
  constructor(private readonly agentRepository: IAgentRepository) {}

  async execute({ agent }: EditAgentRequest): Promise<void> {
    await this.agentRepository.update(agent);
  }
}
