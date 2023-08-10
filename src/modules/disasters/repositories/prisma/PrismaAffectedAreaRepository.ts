import { PrismaService } from 'src/prisma.service';
import { AffectedAreaRepository } from '../IAffectedAreaRepository';
import { Injectable } from '@nestjs/common';
import { AffectedArea } from '../../domain/affectedArea/affected-area';
import { AffectedAreaMapper } from '../../mappers/AffectedAreaMapper';

@Injectable()
export class PrismaAffectedAreaRepository implements AffectedAreaRepository {
  constructor(readonly prisma: PrismaService) {}

  async save(affectedArea: AffectedArea): Promise<void> {
    const a = AffectedAreaMapper.toPersistence(affectedArea);

    await this.prisma.areaAfetada.create({
      data: {
        ...a,
      },
    });
  }

  async update(affectedArea: AffectedArea): Promise<void> {
    const a = AffectedAreaMapper.toPersistence(affectedArea);

    await this.prisma.areaAfetada.update({
      where: {
        id: a.id,
      },
      data: {
        ...a,
      },
    });
  }

  async find(id: string): Promise<AffectedArea> {
    const area = await this.prisma.areaAfetada.findUnique({
      where: {
        id,
      },
      include: {
        unidadesHabitacionais: {
          include: {
            fotos: true,
          },
        },
        Desastre: {
          include: {
            municipio: true,
          },
        },
      },
    });

    if (!area) return null;

    return AffectedAreaMapper.toDomainWithDetails(area);
  }
  async findByOrder(order: number): Promise<AffectedArea> {
    const area = await this.prisma.areaAfetada.findUnique({
      where: {
        ORDEM: order,
      },
      include: {
        unidadesHabitacionais: {
          include: {
            fotos: true,
          },
        },
        Desastre: {
          include: {
            municipio: true,
          },
        },
      },
    });

    if (!area) return null;

    return AffectedAreaMapper.toDomainWithDetails(area);
  }

  async findAll(disaster_id: string): Promise<AffectedArea[]> {
    const areas = await this.prisma.areaAfetada.findMany({
      where: {
        desastreId: disaster_id,
      },
    });

    return areas.map(AffectedAreaMapper.toDomain);
  }
}
