import { Fotos } from '../domain/fotos/fotos';

export abstract class FotosRepository {
  abstract save(photos: Fotos[]): Promise<void>;
  abstract find(id: string): Promise<Fotos>;
  abstract delete(id: string[]): Promise<void>;
}
