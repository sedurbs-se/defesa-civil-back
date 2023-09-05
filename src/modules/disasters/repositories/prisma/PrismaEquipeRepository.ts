import { Injectable } from '@nestjs/common';
import { Equipe } from '../../domain/agenteEquipe/equipe';
import { EquipeRepository } from '../EquipeRepository';
import { PrismaService } from 'src/prisma.service';
import { EquipeMapper } from '../../mappers/EquipeMapper';

@Injectable()
export class PrismaEquipeRepository implements EquipeRepository {
  constructor(private prisma: PrismaService) {}

  async findByAffectedAreaId(affectedAreaId: string): Promise<Equipe[]> {
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

    return teams.map((e) => EquipeMapper.toDomain(e));
  }

  async find(id: string): Promise<Equipe> {
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

    return EquipeMapper.toDomain(team);
  }
  async save(team: Equipe): Promise<void> {
    const t = EquipeMapper.toPersistence(team);
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
  async update(team: Equipe): Promise<void> {
    const t = EquipeMapper.toPersistence(team);
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
