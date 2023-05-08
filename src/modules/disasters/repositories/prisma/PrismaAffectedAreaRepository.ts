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
  async find(id: string): Promise<AffectedArea> {
    const area = await this.prisma.areaAfetada.findUnique({
      where: {
        id,
      },
      include: {
        unidadesHabitacionais: true,
      },
    });

    return AffectedAreaMapper.toDomain(area);
  }
  async findAll(): Promise<AffectedArea[]> {
    const areas = await this.prisma.areaAfetada.findMany({});

    return areas.map(AffectedAreaMapper.toDomain);
  }
}
