import { Injectable } from '@nestjs/common';
import { Team } from '../../domain/agentTeam/team';
import { ITeamRepository } from '../ITeamRepository';
import { PrismaService } from 'src/prisma.service';
import { TeamMapper } from '../../mappers/TeamMapper';

@Injectable()
export class PrismaTeamRepository implements ITeamRepository {
  constructor(private prisma: PrismaService) {}

  async findByAffectedAreaId(affectedAreaId: string): Promise<Team[]> {
    const teams = await this.prisma.equipe.findMany({
      where: {
        areaAfetadaId: affectedAreaId,
      },
      include: {
        equipeAgente: {
          include: {
            agente: true,
          },
        },
      },
    });

    return teams.map((e) => TeamMapper.toDomain(e));
  }

  async find(id: string): Promise<Team> {
    const team = await this.prisma.equipe.findUnique({
      where: {
        id,
      },
      include: {
        equipeAgente: {
          include: {
            agente: true,
          },
        },
      },
    });
    if (!team) {
      return null;
    }

    return TeamMapper.toDomain(team);
  }
  async save(team: Team): Promise<void> {
    const t = TeamMapper.toPersistence(team);
    await this.prisma.equipe.create({
      data: {
        id: t.id,
        nome: t.nome,
        areaAfetadaId: t.areaAfetadaId,
      },
    });

    await this.prisma.equipeAgente.createMany({
      data: t.agentes,
    });
  }
  async update(team: Team): Promise<void> {
    const t = TeamMapper.toPersistence(team);
    await this.prisma.equipe.update({
      where: {
        id: t.id,
      },
      data: {
        id: t.id,
        nome: t.nome,
        areaAfetadaId: t.areaAfetadaId,
      },
    });

    await this.prisma.equipeAgente.deleteMany({
      where: {
        equipeId: t.id,
      },
    });

    await this.prisma.equipeAgente.createMany({
      data: t.agentes,
    });
  }
}
