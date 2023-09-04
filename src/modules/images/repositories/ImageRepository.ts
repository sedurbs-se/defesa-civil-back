import { Image } from '../domain/image';

export abstract class ImageRepository {
  abstract save(image: Image): Promise<Image>;
  abstract update(image: Image): Promise<void>;
  abstract find(id: string): Promise<Image>;
  abstract findAll(): Promise<Image[]>;
}
