import { PrismaService } from 'src/prisma.service';
import { Agente } from '../../domain/agente/agente';
import { AgenteRepository } from '../AgenteRepository';
import { AgenteMapper } from '../../mappers/AgenteMapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaAgenteRepository implements AgenteRepository {
  constructor(private readonly prisma: PrismaService) {}
  findPage(): Promise<Agente[]> {
    throw new Error('Method not implemented.');
  }
  async find(): Promise<Agente[]> {
    const agents = await this.prisma.agente.findMany({
      include: {
        user: true,
      },
      orderBy: {
        user: {
          nome: 'asc',
        },
      },
    });
    return agents.map((agent) => AgenteMapper.toDomainWithUser(agent));
  }
  async findByCpf(cpf: string): Promise<Agente | null> {
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

    return AgenteMapper.toDomainWithUser(agent);
  }

  async getById(id: string): Promise<Agente> {
    const agent = await this.prisma.agente.findFirst({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    if (!agent) return null;

    return AgenteMapper.toDomainWithUser(agent);
  }
  async getByUserId(user_id: string): Promise<Agente> {
    const agent = await this.prisma.agente.findUnique({
      where: {
        usuarioId: user_id,
      },
    });

    if (!agent) return null;

    return AgenteMapper.toDomain(agent);
  }
  async save(Agent: Agente): Promise<void> {
    const a = AgenteMapper.toPersistence(Agent);
    await this.prisma.agente.create({
      data: a,
    });
  }
  async update(Agent: Agente): Promise<void> {
    const c = AgenteMapper.toPersistence(Agent);
    await this.prisma.agente.update({
      where: {
        id: c.id,
      },
      data: c,
    });
  }
}
