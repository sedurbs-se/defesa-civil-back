import { Photos } from '../domain/photos/photos';

export abstract class PhotosRepository {
  abstract save(photos: Photos[]): Promise<void>;
  abstract find(id: string): Promise<Photos>;
  abstract delete(id: string): Promise<void>;
}
