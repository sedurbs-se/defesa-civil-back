import { Cidade } from '../domain/cidade/cidade';

export abstract class CidadeRepository {
  abstract save(city: Cidade): Promise<void>;
  abstract find(id: string): Promise<Cidade>;
  abstract findAll(): Promise<Cidade[]>;
}
