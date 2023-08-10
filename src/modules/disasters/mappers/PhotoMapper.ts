import { FotoUnidade as PersistencePhotos } from '@prisma/client';
import { Photos } from '../domain/Photos/Photos';

export class PhotosMapper {
  static toDomain(raw: PersistencePhotos) {
    return new Photos({
      id: raw.id,
      url: raw.url,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      unidadeHabitacionalId: raw.unidadeHabitacionalId,
    });
  }

  static toPersistence(Photos: Photos) {
    return {
      id: Photos.id,
      url: Photos.url,
      unidadeHabitacionalId: Photos.unidadeHabitacionalId,
    };
  }
}
