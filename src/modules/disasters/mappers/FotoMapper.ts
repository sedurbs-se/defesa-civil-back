import { FotoUnidade as PersistencePhotos } from '@prisma/client';
import { Fotos } from '../domain/fotos/fotos';
import { PhotoType } from '../photoEnum';

export class FotosMapper {
  static toDomain(raw: PersistencePhotos) {
    return new Fotos({
      id: raw.id,
      url: raw.url,
      type: PhotoType[raw.type],
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      unidadeHabitacionalId: raw.unidadeHabitacionalId,
    });
  }

  static toPersistence(Fotos: Fotos) {
    return {
      id: Fotos.id,
      url: Fotos.url,
      unidadeHabitacionalId: Fotos.unidadeHabitacionalId,
      type: Fotos.type,
    };
  }
}
