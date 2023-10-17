import { Prisma } from '@prisma/client';
import { StatusFamilia, StatusHabitacao, UnidadeHabitacional } from '../domain/unidadeHabitacional/unidade-habitacional';
import { FotosMapper } from './FotoMapper';
import { AfetadoMapper } from './AfetadoMapper';

const unidadeHabitacionalWithPhotosAndAffecteds =
  Prisma.validator<Prisma.UnidadeHabitacionalArgs>()({
    include: {
      fotos: true,
      afetados: true,
    },
  });

type UnidadeHabitacionalWithPhotosAndAffecteds =
  Prisma.UnidadeHabitacionalGetPayload<
    typeof unidadeHabitacionalWithPhotosAndAffecteds
  >;
const unidadeHabitacionalWithAffecteds =
  Prisma.validator<Prisma.UnidadeHabitacionalArgs>()({
    include: {
      afetados: true,
    },
  });

type UnidadeHabitacionalWithAffecteds = Prisma.UnidadeHabitacionalGetPayload<
  typeof unidadeHabitacionalWithAffecteds
>;

export class UnidadeMapper {
  static toDomain(raw: UnidadeHabitacionalWithPhotosAndAffecteds) {
    return new UnidadeHabitacional({
      id: raw.id,
      ordem: raw.ORDEM,

      areaAfetadaId: raw.areaAfetadaId,
      endereco: raw.endereco,
      coordenadas: raw.coordenadas,
      fotos: raw.fotos ? raw.fotos.map((f) => FotosMapper.toDomain(f)) : [],
      afetados: raw.afetados
        ? raw.afetados.map((a) => AfetadoMapper.toDomain(a))
        : [],
      status_habitacao: raw.status_habitacao as StatusHabitacao,
      status_familia: raw.status_familia as StatusFamilia,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static ToDomainWithAffecteds(raw: UnidadeHabitacionalWithAffecteds) {
    return new UnidadeHabitacional({
      id: raw.id,
      ordem: raw.ORDEM,

      areaAfetadaId: raw.areaAfetadaId,
      endereco: raw.endereco,
      coordenadas: raw.coordenadas,
      afetados: raw.afetados
        ? raw.afetados.map((a) => AfetadoMapper.toDomain(a))
        : [],
      status_habitacao: raw.status_habitacao as StatusHabitacao,
      status_familia: raw.status_familia as StatusFamilia,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistence(housingUnit: UnidadeHabitacional) {
    return {
      id: housingUnit.id,
      ORDEM: housingUnit.ordem,
      areaAfetadaId: housingUnit.areaAfetadaId,
      endereco: housingUnit.endereco,
      coordenadas: housingUnit.coordenadas,

      fotos: housingUnit.fotos
        ? housingUnit.fotos.map((p) => FotosMapper.toPersistence(p))
        : [],
        status_habitacao: housingUnit.status_habitacao,
        status_familia: housingUnit.status_familia,
    };
  }
}
