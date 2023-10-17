import { UnidadeHabitacional } from 'src/modules/disasters/domain/unidadeHabitacional/unidade-habitacional';
import { UnidadeHabitacionalRepository } from '../UnidadeHabitacionalRepository';
import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';
import { UnidadeMapper } from '../../mappers/UnidadeMapper';

@Injectable()
export class PrismaUnidadeHabitacionalRepository
  implements UnidadeHabitacionalRepository
{
  constructor(private readonly prisma: PrismaService) {}
  async save(housingUnit: UnidadeHabitacional): Promise<void> {
    const data = UnidadeMapper.toPersistence(housingUnit);
    await this.prisma.unidadeHabitacional.create({
      data: {
        ...data,
        fotos: {
          create: data.fotos,
        },
      },
    });
  }

  async update(housingUnit: UnidadeHabitacional): Promise<void> {
    const {fotos,...data} = UnidadeMapper.toPersistence(housingUnit);

    await this.prisma.unidadeHabitacional.update({
      where: {
        id: housingUnit.id,
      },
      data: {
        ...data,
        fotos: {
          create: fotos,
        },
      },
    });
  }

  async delete(housingUnit: UnidadeHabitacional): Promise<UnidadeHabitacional> {
    const data = UnidadeMapper.toPersistence(housingUnit);
    const deleted = await this.prisma.unidadeHabitacional.create({
      data: {
        ...data,
        fotos: {
          create: data.fotos,
        },
        deletedAt: new Date(),
      },
      include: { fotos: true, afetados: true}
    });

    return UnidadeMapper.toDomain(deleted);
  }

  async find(id: string): Promise<UnidadeHabitacional> {
    const housingUnit = await this.prisma.unidadeHabitacional.findUnique({
      where: {
        id: id,
      },
      include: {
        fotos: true,
        afetados: true,
      },
    });
    if (!housingUnit) return null;

    return UnidadeMapper.toDomain(housingUnit);
  }

  async findByOrdem(ordem: number): Promise<UnidadeHabitacional> {
    const housingUnit = await this.prisma.unidadeHabitacional.findFirst({
      where: {
        ORDEM: ordem,
      },
      include: {
        fotos: true,
        afetados: true,
      },
    });

    if (!housingUnit) return null;

    return UnidadeMapper.toDomain(housingUnit);
  }
  
  async findAll(area_id: string): Promise<UnidadeHabitacional[]> {
    const housingUnits = await this.prisma.unidadeHabitacional.findMany({
      include: {
        fotos: true,
        afetados: true,
      },
      where: {
        areaAfetadaId: area_id,
      },
    });

    return housingUnits.map(UnidadeMapper.toDomain);
  }
}
