import { PrismaService } from 'src/prisma.service';
import { AreaAfetadaRepository } from '../AreaAfetadaRepository';
import { Injectable } from '@nestjs/common';
import { AreaAfetada } from '../../domain/areaAfetada/area-afetada';
import { AreaAfetadaMapper } from '../../mappers/AreaAfetadaMapper';
import { AffectedAreaWithDetails } from '../../useCases/ObterArea/ObterArea';
import { UnidadeMapper } from '../../mappers/UnidadeMapper';

@Injectable()
export class PrismaAreaAfetadaRepository implements AreaAfetadaRepository {
  constructor(readonly prisma: PrismaService) {}

  async save(affectedArea: AreaAfetada): Promise<void> {
    const a = AreaAfetadaMapper.toPersistence(affectedArea);

    await this.prisma.areaAfetada.create({
      data: {
        ...a,
      },
    });
  }

  async update(affectedArea: AreaAfetada): Promise<void> {
    const a = AreaAfetadaMapper.toPersistence(affectedArea);

    await this.prisma.areaAfetada.update({
      where: {
        id: a.id,
      },
      data: {
        ...a,
      },
    });
  }

  async find(id: string): Promise<AreaAfetada> {
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

    return AreaAfetadaMapper.toDomainWithDisaster(area);
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

    const u = await this.prisma.unidadeHabitacional.findMany({
      where: {
        areaAfetadaId: id,
      },
      include: {
        afetados: true,
      },
    });

    const unities = u.map((u) => UnidadeMapper.ToDomainWithAffecteds(u));

    const affected_people_count = unities.reduce(
      (acc, curr) => ({
        qtd_pessoas: acc.qtd_pessoas + curr.afetados.length,
        qtd_idosos:
          acc.qtd_idosos +
          curr.afetados.filter((a) => a.obterGrupoIdade() === 'IDOSO').length,
        qtd_adultos:
          acc.qtd_adultos +
          curr.afetados.filter((a) => a.obterGrupoIdade() === 'ADULTO').length,
        qtd_criancas:
          acc.qtd_criancas +
          curr.afetados.filter((a) => a.obterGrupoIdade() === 'CRIANÇA').length,
        qtd_adolescente:
          acc.qtd_adolescente +
          curr.afetados.filter((a) => a.obterGrupoIdade() === 'ADOLESCENTE')
            .length,
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
      area: AreaAfetadaMapper.toDomainWithDisaster(area),
      affected_people_count,
      unity_count: unity_count,
    };
  }

  async findByOrder(order: number): Promise<AreaAfetada> {
    const area = await this.prisma.areaAfetada.findFirst({
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

    return AreaAfetadaMapper.toDomainWithDetails(area);
  }

  async findAll(disaster_id: string): Promise<AreaAfetada[]> {
    const areas = await this.prisma.areaAfetada.findMany({
      where: {
        desastreId: disaster_id,
      },
    });

    return areas.map(AreaAfetadaMapper.toDomain);
  }

  async delete(alteracao: AreaAfetada): Promise<AreaAfetada> {
    const a = AreaAfetadaMapper.toPersistence(alteracao);

    const area = await this.prisma.areaAfetada.delete({
      where: {
        id: a.id,
      },
    });

    return AreaAfetadaMapper.toDomain(area);
  }
}
