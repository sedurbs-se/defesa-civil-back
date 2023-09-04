import { Imagem as PersistenceImage } from '@prisma/client';
import { Image } from '../domain/image';

export class ImageMapper {
  static toDomain(raw: PersistenceImage) {
    return new Image({
      id: raw.id,
      url: raw.url,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistence(image: Image) {
    return {
      id: image.id,
      url: image.url,
      createdAt: image.createdAt,
      updatedAt: image.updatedAt,
    };
  }
}
