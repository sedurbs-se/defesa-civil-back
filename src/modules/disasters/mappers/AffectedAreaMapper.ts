import { AreaAfetada as PersistenceAffectedArea, Prisma } from '@prisma/client';
import { AffectedArea } from '../domain/affectedArea/affected-area';
import { HousingUnitMapper } from './HousingUnitMapper';
import { Disaster } from '../domain/disaster/disaster';
import { City } from '../domain/city/city';

const areaWithUnity = Prisma.validator<Prisma.AreaAfetadaArgs>()({
  include: {
    unidadesHabitacionais: true,
    Desastre: {
      include: {
        municipio: true,
      },
    },
  },
});

type DisasterWithAreaAndCity = Prisma.AreaAfetadaGetPayload<
  typeof areaWithUnity
>;

export class AffectedAreaMapper {
  static toDomain(raw: PersistenceAffectedArea) {
    return new AffectedArea({
      id: raw.id,
      disasterId: raw.desastreId,
      order: raw.ORDEM,
      name: raw.nome,
    });
  }

  static toDomainWithDetails(raw: DisasterWithAreaAndCity) {
    return new AffectedArea({
      id: raw.id,
      disasterId: raw.desastreId,
      disaster: raw.Desastre
        ? new Disaster({
            id: raw.Desastre.id,
            date: raw.Desastre.data,
            cityId: raw.Desastre.municipioId,
            city: new City({
              id: raw.Desastre.municipio.id,
              name: raw.Desastre.municipio.nome,
            }),
          })
        : null,
      order: raw.ORDEM,
      name: raw.nome,
      housingUnits: raw.unidadesHabitacionais.map(HousingUnitMapper.toDomain),
    });
  }

  static toPersistence(affectedArea: AffectedArea) {
    return {
      id: affectedArea.id,
      desastreId: affectedArea.disasterId,
      nome: affectedArea.name,
      ORDEM: affectedArea.order,
    };
  }
}
