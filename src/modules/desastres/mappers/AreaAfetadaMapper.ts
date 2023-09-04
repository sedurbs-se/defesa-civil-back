import { AreaAfetada as PersistenceAffectedArea, Prisma } from '@prisma/client';
import { AreaAfetada } from '../domain/areaAfetada/area-afetada';
import { UnidadeMapper } from './UnidadeMapper';
import { Desastre } from '../domain/desastre/desastre';
import { Cidade } from '../domain/cidade/cidade';

const areaWithUnityAndDisaster = Prisma.validator<Prisma.AreaAfetadaArgs>()({
  include: {
    unidadesHabitacionais: true,
    Desastre: {
      include: {
        municipio: true,
      },
    },
  },
});

const areaWithUnity = Prisma.validator<Prisma.AreaAfetadaArgs>()({
  include: {
    unidadesHabitacionais: true,
  },
});

type DisasterWithAreaAndCity = Prisma.AreaAfetadaGetPayload<
  typeof areaWithUnity
>;

type DisasterWithAreaAndCityAndDisaster = Prisma.AreaAfetadaGetPayload<
  typeof areaWithUnityAndDisaster
>;

export class AreaAfetadaMapper {
  static toDomain(raw: PersistenceAffectedArea) {
    return new AreaAfetada({
      id: raw.id,
      desastreId: raw.desastreId,
      ordem: raw.ORDEM,
      nome: raw.nome,
    });
  }

  static toDomainWithDisaster(raw: DisasterWithAreaAndCityAndDisaster) {
    return new AreaAfetada({
      id: raw.id,
      desastreId: raw.desastreId,
      desastre: raw.Desastre
        ? new Desastre({
            id: raw.Desastre.id,
            data: raw.Desastre.data,
            cidadeId: raw.Desastre.municipioId,
            cidade: new Cidade({
              id: raw.Desastre.municipio.id,
              nome: raw.Desastre.municipio.nome,
            }),
          })
        : null,
      ordem: raw.ORDEM,
      nome: raw.nome,
      unidadesHabitacionais: raw.unidadesHabitacionais.map(
        UnidadeMapper.toDomain,
      ),
    });
  }

  static toDomainWithDetails(raw: DisasterWithAreaAndCity) {
    return new AreaAfetada({
      id: raw.id,
      desastreId: raw.desastreId,
      ordem: raw.ORDEM,
      nome: raw.nome,
      unidadesHabitacionais: raw.unidadesHabitacionais.map(
        UnidadeMapper.toDomain,
      ),
    });
  }

  static toPersistence(affectedArea: AreaAfetada) {
    return {
      id: affectedArea.id,
      desastreId: affectedArea.desastreId,
      nome: affectedArea.nome,
      ORDEM: affectedArea.ordem,
    };
  }
}
