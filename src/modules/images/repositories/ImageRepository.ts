import { Image } from '../domain/image';

export abstract class ImageRepository {
  abstract save(image: Image): Promise<Image>;
  abstract find(id: string): Promise<Image>;
  abstract findAll(): Promise<Image[]>;
}
