import { PrismaService } from 'src/prisma.service';
import { Agent } from '../../domain/agent/agent';
import { IAgentRepository } from '../IAgentRepository';
import { AgentMapper } from '../../mappers/AgentMapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaAgentRepository implements IAgentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getById(id: string): Promise<Agent> {
    const agent = await this.prisma.agente.findUnique({
      where: {
        id,
      },
    });

    if (!agent) return null;

    return AgentMapper.toDomain(agent);
  }
  async getByUserId(user_id: string): Promise<Agent> {
    const agent = await this.prisma.agente.findUnique({
      where: {
        usuarioId: user_id,
      },
    });

    if (!agent) return null;

    return AgentMapper.toDomain(agent);
  }
  async save(Agent: Agent): Promise<void> {
    const a = AgentMapper.toPersistence(Agent);
    await this.prisma.agente.create({
      data: a,
    });
  }
  async update(Agent: Agent): Promise<void> {
    const c = AgentMapper.toPersistence(Agent);
    await this.prisma.agente.create({
      data: c,
    });
  }
}
