import { Prisma } from '@prisma/client';
import { HousingUnit } from '../domain/housingUnit/housing-unit';
import { PhotosMapper } from './PhotoMapper';

const unidadeHabitacionalWithPhotos =
  Prisma.validator<Prisma.UnidadeHabitacionalArgs>()({
    include: { fotos: true },
  });

type UnidadeHabitacionalWithPhotos = Prisma.UnidadeHabitacionalGetPayload<
  typeof unidadeHabitacionalWithPhotos
>;

export class HousingUnitMapper {
  static toDomain(raw: UnidadeHabitacionalWithPhotos) {
    return new HousingUnit({
      id: raw.id,
      order: raw.ORDEM,

      affectedAreaId: raw.areaAfetadaId,
      address: raw.endereco,
      coordinates: raw.coordenadas,
      photos: raw.fotos ? raw.fotos.map((f) => PhotosMapper.toDomain(f)) : [],

      fl_sos: raw.fl_sos,
      qtd_familias: raw.qtd_familias,
      qtd_adultos: raw.qtd_adultos,
      qtd_adolescente: raw.qtd_adolescente,
      qtd_criancas: raw.qtd_criancas,
      qtd_homens: raw.qtd_homens,
      qtd_idosos: raw.qtd_idosos,
      qtd_mulheres: raw.qtd_mulheres,
      qtd_pessoas: raw.qtd_pessoas,

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

      fl_sos: housingUnit.fl_sos,
      qtd_familias: housingUnit.qtd_familias,
      qtd_adultos: housingUnit.qtd_adultos,
      qtd_adolescente: housingUnit.qtd_adolescente,
      qtd_criancas: housingUnit.qtd_criancas,
      qtd_homens: housingUnit.qtd_homens,
      qtd_idosos: housingUnit.qtd_idosos,
      qtd_mulheres: housingUnit.qtd_mulheres,
      qtd_pessoas: housingUnit.qtd_pessoas,
      fl_danificado: housingUnit.fl_danificado,
      fl_desabrigado: housingUnit.fl_desabrigado,
      fl_desalojado: housingUnit.fl_desalojado,
      fl_destroido: housingUnit.fl_destroido,
      fl_resiliente: housingUnit.fl_resiliente,
      fl_resistente: housingUnit.fl_resistente,
    };
  }
}
