import { PrismaService } from 'src/prisma.service';
import { Agent } from '../../domain/agent/agent';
import { IAgentRepository } from '../IAgentRepository';
import { AgentMapper } from '../../mappers/AgentMapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaAgentRepository implements IAgentRepository {
  constructor(private readonly prisma: PrismaService) {}
  findPage(): Promise<Agent[]> {
    throw new Error('Method not implemented.');
  }
  async find(): Promise<Agent[]> {
    const agents = await this.prisma.agente.findMany({
      include: {
        user: true,
      },
    });
    return agents.map((agent) => AgentMapper.toDomainWithUser(agent));
  }
  async findByCpf(cpf: string): Promise<Agent | null> {
    const agent = await this.prisma.agente.findFirst({
      where: {
        user: {
          cpf: {
            startsWith: cpf,
          },
        },
      },
      include: {
        user: true,
      },
    });

    if (!agent) return null;

    return AgentMapper.toDomainWithUser(agent);
  }

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
