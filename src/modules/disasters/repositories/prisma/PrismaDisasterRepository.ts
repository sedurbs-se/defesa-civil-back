import { Disaster } from 'src/modules/disasters/domain/disaster/disaster';
import { DisasterRepository } from '../IDisasterRepository';
import { PrismaService } from 'src/prisma.service';
import { DisasterMapper } from '../../mappers/DisasterMapper';
import { Injectable } from '@nestjs/common';
import { DisasterWithDetails } from '../../useCases/GetDisaster/GetDisaster';
import { HousingUnitMapper } from '../../mappers/HousingUnitMapper';

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

  async update(disaster: Disaster): Promise<void> {
    const m = DisasterMapper.toPersistence(disaster);
    await this.prisma.desastre.update({
      where: {
        id: m.id,
      },
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

  async findAll(select_areas = false): Promise<Disaster[]> {
    const desastres = await this.prisma.desastre.findMany({
      include: {
        municipio: true,
        areas: {
          include: {
            unidadesHabitacionais: {
              include: {
                fotos: true,
              },
            },
          },
        },
      },
    });

    return desastres.map(DisasterMapper.toDomainWithDetailsAndUnity);
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

    const disaster = DisasterMapper.toDomainWithDetails(d);

    const u = await this.prisma.unidadeHabitacional.findMany({
      where: {
        areaAfetadaId: {
          in: disaster.affectedAreas.map((a) => a.id),
        },
      },
      include: {
        afetados: true,
      },
    });

    const unities = u.map((u) => HousingUnitMapper.ToDomainWithAffecteds(u));

    const affected_people_count = unities.reduce(
      (acc, curr) => ({
        qtd_pessoas: acc.qtd_pessoas + curr.affecteds.length,
        qtd_idosos:
          acc.qtd_idosos +
          curr.affecteds.filter((a) => a.getAgeGroup() === 'IDOSO').length,
        qtd_adultos:
          acc.qtd_adultos +
          curr.affecteds.filter((a) => a.getAgeGroup() === 'ADULTO').length,
        qtd_criancas:
          acc.qtd_criancas +
          curr.affecteds.filter((a) => a.getAgeGroup() === 'CRIANÇA').length,
        qtd_adolescente:
          acc.qtd_adolescente +
          curr.affecteds.filter((a) => a.getAgeGroup() === 'ADOLESCENTE')
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
      area_count: disaster.affectedAreas.length,
    };
  }
}

export { PrismaDisasterRepository };
