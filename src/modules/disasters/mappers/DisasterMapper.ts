import { Desastre as PersistenceDisaster, Prisma } from '@prisma/client';
import { Disaster } from '../domain/disaster/disaster';
import { AffectedAreaMapper } from './AffectedAreaMapper';
import { CityMapper } from './CityMapper';

// 1: Define a type that includes the relation to `Post`

const disasterWithAreaCity = Prisma.validator<Prisma.DesastreArgs>()({
  include: { areas: true, municipio: true },
});

type DisasterWithAreaCity = Prisma.DesastreGetPayload<
  typeof disasterWithAreaCity
>;

const disasterWithAreaAndCity = Prisma.validator<Prisma.DesastreArgs>()({
  include: { areas: true, municipio: true },
});

type DisasterWithAreaAndCity = Prisma.DesastreGetPayload<
  typeof disasterWithAreaAndCity
>;

export class DisasterMapper {
  static toDomain(raw: DisasterWithAreaCity) {
    return new Disaster({
      id: raw.id,
      cityId: raw.municipioId,
      date: raw.data,
      city: CityMapper.toDomain(raw.municipio),
    });
  }

  static toDomainWithDetails(raw: DisasterWithAreaAndCity) {
    return new Disaster({
      id: raw.id,
      cityId: raw.municipioId,
      date: raw.data,
      affectedAreas: raw.areas.map((a) => AffectedAreaMapper.toDomain(a)),
      city: CityMapper.toDomain(raw.municipio),
    });
  }

  static toPersistence(disaster: Disaster) {
    return {
      id: disaster.id,
      municipioId: disaster.cityId,
      data: disaster.date,
    };
  }
}
