import { Desastre } from 'src/modules/disasters/domain/desastre/desastre';
import { DesastreRepository } from '../DesastreRepository';
import { PrismaService } from 'src/prisma.service';
import { DesastreMapper } from '../../mappers/DesastreMapper';
import { Injectable } from '@nestjs/common';
import { DisasterWithDetails } from '../../useCases/ObterDesastre/ObterDesastre';
import { UnidadeMapper } from '../../mappers/UnidadeMapper';

@Injectable()
class PrismaDesastreRepository implements DesastreRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(disaster: Desastre): Promise<void> {
    const m = DesastreMapper.toPersistence(disaster);
    await this.prisma.desastre.create({
      data: {
        ...m,
      },
    });
  }

  async update(disaster: Desastre): Promise<void> {
    const m = DesastreMapper.toPersistence(disaster);
    await this.prisma.desastre.update({
      where: {
        id: m.id,
      },
      data: {
        ...m,
      },
    });
  }

  async find(id: string): Promise<Desastre> {
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

    return DesastreMapper.toDomainWithDetails(desastre);
  }

  async findAll(select_areas = false): Promise<Desastre[]> {
    const desastres = await this.prisma.desastre.findMany({
      include: {
        municipio: true,
        areas: {
          include: {
            unidadesHabitacionais: {
              include: {
                afetados: true,
                fotos: true,
              },
            },
          },
        },
      },
    });

    return desastres.map(DesastreMapper.toDomainWithDetailsAndUnity);
  }

  async getDisasterDetails(id: string): Promise<DisasterWithDetails> {
    const d = await this.prisma.desastre.findUnique({
      where: {
        id: id,
      },
      include: {
        areas: true,
        municipio: true,
      },
    });

    if (!d) return null;

    const disaster = DesastreMapper.toDomainWithDetails(d);

    const u = await this.prisma.unidadeHabitacional.findMany({
      where: {
        areaAfetadaId: {
          in: disaster.areasAfetadas.map((a) => a.id),
        },
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
      disaster,
      affected_people_count,
      unity_count: unity_count,
      area_count: disaster.areasAfetadas.length,
    };
  }
}

export { PrismaDesastreRepository };
