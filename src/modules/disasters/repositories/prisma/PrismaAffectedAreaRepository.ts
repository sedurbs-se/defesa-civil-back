import { PrismaService } from 'src/prisma.service';
import { AffectedAreaRepository } from '../IAffectedAreaRepository';
import { Injectable } from '@nestjs/common';
import { AffectedArea } from '../../domain/affectedArea/affected-area';
import { AffectedAreaMapper } from '../../mappers/AffectedAreaMapper';
import { AffectedAreaWithDetails } from '../../useCases/GetArea/GetArea';

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

    return AffectedAreaMapper.toDomainWithDisaster(area);
  }

  async findWithDetails(id: string): Promise<AffectedAreaWithDetails> {
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
    const unities = await this.prisma.unidadeHabitacional.findMany({
      where: {
        areaAfetadaId: id,
      },
      select: {
        qtd_pessoas: true,
        qtd_idosos: true,
        qtd_adultos: true,
        qtd_criancas: true,
        qtd_adolescente: true,

        fl_resiliente: true,
        fl_desabrigado: true,
        fl_desalojado: true,

        fl_danificado: true,
        fl_destroido: true,
        fl_resistente: true,
      },
    });

    const affected_people_count = unities.reduce(
      (acc, curr) => ({
        qtd_pessoas: acc.qtd_pessoas + curr.qtd_pessoas,
        qtd_idosos: acc.qtd_idosos + curr.qtd_idosos,
        qtd_adultos: acc.qtd_adultos + curr.qtd_adultos,
        qtd_criancas: acc.qtd_criancas + curr.qtd_criancas,
        qtd_adolescente: acc.qtd_adolescente + curr.qtd_adolescente,
      }),
      {
        qtd_pessoas: 0,
        qtd_idosos: 0,
        qtd_adultos: 0,
        qtd_criancas: 0,
        qtd_adolescente: 0,
      },
    );

    const unity_count = unities.reduce(
      (acc, curr) => {
        if (curr.fl_resiliente) acc.resilientes++;
        if (curr.fl_desabrigado) acc.desabrigados++;
        if (curr.fl_desalojado) acc.desalojados++;

        if (curr.fl_danificado) acc.danificados++;
        if (curr.fl_destroido) acc.destruidos++;
        if (curr.fl_resistente) acc.resistentes++;

        acc.count++;
        return acc;
      },
      {
        resilientes: 0,
        desabrigados: 0,
        desalojados: 0,

        danificados: 0,
        destruidos: 0,
        resistentes: 0,

        count: 0,
      },
    );

    return {
      area: AffectedAreaMapper.toDomainWithDisaster(area),
      affected_people_count,
      unity_count: unity_count,
    };
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
