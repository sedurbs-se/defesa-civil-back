import { Prisma } from '@prisma/client';
import { UnidadeHabitacional } from '../domain/unidadeHabitacional/unidade-habitacional';
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
      fl_danificado: raw.fl_danificado,
      fl_desabrigado: raw.fl_desabrigado,
      fl_desalojado: raw.fl_desalojado,
      fl_destroido: raw.fl_destroido,
      fl_resiliente: raw.fl_resiliente,
      fl_resistente: raw.fl_resistente,

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
      fl_danificado: raw.fl_danificado,
      fl_desabrigado: raw.fl_desabrigado,
      fl_desalojado: raw.fl_desalojado,
      fl_destroido: raw.fl_destroido,
      fl_resiliente: raw.fl_resiliente,
      fl_resistente: raw.fl_resistente,

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

      fl_danificado: housingUnit.fl_danificado,
      fl_desabrigado: housingUnit.fl_desabrigado,
      fl_desalojado: housingUnit.fl_desalojado,
      fl_destroido: housingUnit.fl_destroido,
      fl_resiliente: housingUnit.fl_resiliente,
      fl_resistente: housingUnit.fl_resistente,
    };
  }
}
