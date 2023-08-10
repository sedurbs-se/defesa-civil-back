import { HousingUnit } from 'src/modules/disasters/domain/housingUnit/housing-unit';
import { HousingUnitRepository } from '../IHousingUnitRepository';
import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';
import { HousingUnitMapper } from '../../mappers/HousingUnitMapper';

@Injectable()
export class PrismaHousingUnitRepository implements HousingUnitRepository {
  constructor(private readonly prisma: PrismaService) {}
  async save(housingUnit: HousingUnit): Promise<void> {
    const { ...data } = HousingUnitMapper.toPersistence(housingUnit);

    await this.prisma.unidadeHabitacional.create({
      data: {
        ...data,
        fotos: {
          create: data.fotos,
        },
      },
    });
  }


  async update(housingUnit: HousingUnit): Promise<void> {
    const { ...data } = HousingUnitMapper.toPersistence(housingUnit);

    await this.prisma.unidadeHabitacional.update({
      where: {
        id: housingUnit.id,
      },
      data: {
        ...data,
        fotos: {
          create: data.fotos,
        },
      },
    });
  }

  async find(id: string): Promise<HousingUnit> {
    const housingUnit = await this.prisma.unidadeHabitacional.findUnique({
      where: {
        id: id,
      },
      include: {
        fotos: true,
      },
    });
    if (!housingUnit) return null;

    return HousingUnitMapper.toDomain(housingUnit);
  }
  async findByOrdem(ordem: number): Promise<HousingUnit> {
    const housingUnit = await this.prisma.unidadeHabitacional.findFirst({
      where: {
        ORDEM: ordem,
      },
      include: {
        fotos: true,
      },
    });

    if (!housingUnit) return null;

    return HousingUnitMapper.toDomain(housingUnit);
  }
  async findAll(area_id: string): Promise<HousingUnit[]> {
    const housingUnits = await this.prisma.unidadeHabitacional.findMany({
      include: {
        fotos: true,
      },
      where: {
        areaAfetadaId: area_id,
      },
    });

    return housingUnits.map(HousingUnitMapper.toDomain);
  }
}
