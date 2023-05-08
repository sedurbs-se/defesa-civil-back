import { Disaster } from 'src/modules/disasters/domain/disaster/disaster';
import { DisasterRepository } from '../IDisasterRepository';
import { PrismaService } from 'src/prisma.service';
import { DisasterMapper } from '../../mappers/DisasterMapper';
import { Injectable } from '@nestjs/common';

@Injectable()
class PrismaDisasterRepository implements DisasterRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(disaster: Disaster): Promise<void> {
    const m = DisasterMapper.toPersistence(disaster);
    await this.prisma.desastre.create({
      data: {
        ...m,
      },
    });
  }

  async find(id: string): Promise<Disaster> {
    const desastre = await this.prisma.desastre.findUnique({
      where: {
        id: id,
      },
      include: {
        areas: true,
        municipio: true,
      },
    });

    if (!desastre) return null;

    return DisasterMapper.toDomainWithDetails(desastre);
  }

  async findAll(): Promise<Disaster[]> {
    const desastres = await this.prisma.desastre.findMany({
      include: {
        municipio: true,
      },
    });

    return desastres.map(DisasterMapper.toDomain);
  }
}

export { PrismaDisasterRepository };
