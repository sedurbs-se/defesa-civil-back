import { AreaAfetada as PersistenceAffectedArea, Prisma } from '@prisma/client';
import { AffectedArea } from '../domain/affectedArea/affected-area';
import { HousingUnitMapper } from './HousingUnitMapper';

const areaWithUnity = Prisma.validator<Prisma.AreaAfetadaArgs>()({
  include: { unidadesHabitacionais: true },
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
    console.log(raw)
    return new AffectedArea({
      id: raw.id,
      disasterId: raw.desastreId,
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
