import { Prisma } from '@prisma/client';
import { Desastre } from '../domain/desastre/desastre';
import { AreaAfetadaMapper } from './AreaAfetadaMapper';
import { CidadeMapper } from './CidadeMapper';

// 1: Define a type that includes the relation to `Post`

const disasterWithAreaCity = Prisma.validator<Prisma.DesastreArgs>()({
  include: { areas: true, municipio: true },
});

type DisasterWithAreaCity = Prisma.DesastreGetPayload<
  typeof disasterWithAreaCity
>;

const disasterWithAreaAndCity = Prisma.validator<Prisma.DesastreArgs>()({
  include: {
    areas: {
      include: {
        unidadesHabitacionais: true,
      },
    },
    municipio: true,
  },
});

type DisasterWithAreaAndCity = Prisma.DesastreGetPayload<
  typeof disasterWithAreaAndCity
>;

export class DesastreMapper {
  static toDomain(raw: DisasterWithAreaCity) {
    return new Desastre({
      id: raw.id,
      cidadeId: raw.municipioId,
      data: raw.data,
      cidade: CidadeMapper.toDomain(raw.municipio),
    });
  }

  static toDomainWithDetails(raw: DisasterWithAreaCity) {
    return new Desastre({
      id: raw.id,
      cidadeId: raw.municipioId,
      data: raw.data,
      areasAfetadas: raw.areas.map((a) => AreaAfetadaMapper.toDomain(a)),
      cidade: CidadeMapper.toDomain(raw.municipio),
    });
  }

  static toDomainWithDetailsAndUnity(raw: DisasterWithAreaAndCity) {
    return new Desastre({
      id: raw.id,
      cidadeId: raw.municipioId,
      data: raw.data,
      areasAfetadas: raw.areas.map((a) =>
        AreaAfetadaMapper.toDomainWithDetails(a),
      ),
      cidade: CidadeMapper.toDomain(raw.municipio),
    });
  }

  static toPersistence(disaster: Desastre) {
    return {
      id: disaster.id,
      municipioId: disaster.cidadeId,
      data: disaster.data,
    };
  }
}
