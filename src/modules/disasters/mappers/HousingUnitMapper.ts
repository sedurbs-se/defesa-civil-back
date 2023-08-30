import { Prisma } from '@prisma/client';
import { HousingUnit } from '../domain/housingUnit/housing-unit';
import { PhotosMapper } from './PhotoMapper';
import { AffectedMapper } from './AffectedMapper';

const unidadeHabitacionalWithPhotosAndAffecteds =
  Prisma.validator<Prisma.UnidadeHabitacionalArgs>()({
    include: { 
      fotos: true,
      afetados: true,
    },
  });

type UnidadeHabitacionalWithPhotosAndAffecteds = Prisma.UnidadeHabitacionalGetPayload<
  typeof unidadeHabitacionalWithPhotosAndAffecteds
>;

export class HousingUnitMapper {
  static toDomain(raw: UnidadeHabitacionalWithPhotosAndAffecteds) {
    return new HousingUnit({
      id: raw.id,
      order: raw.ORDEM,

      affectedAreaId: raw.areaAfetadaId,
      address: raw.endereco,
      coordinates: raw.coordenadas,
      photos: raw.fotos ? raw.fotos.map((f) => PhotosMapper.toDomain(f)) : [],
      affecteds: raw.afetados ? raw.afetados.map((a) => AffectedMapper.toDomain(a)) : [],
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

  static toPersistence(housingUnit: HousingUnit) {
    return {
      id: housingUnit.id,
      ORDEM: housingUnit.order,
      areaAfetadaId: housingUnit.affectedAreaId,
      endereco: housingUnit.address,
      coordenadas: housingUnit.coordinates,

      fotos: housingUnit.photos
        ? housingUnit.photos.map((p) => PhotosMapper.toPersistence(p))
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
