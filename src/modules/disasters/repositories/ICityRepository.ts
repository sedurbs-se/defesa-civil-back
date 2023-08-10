import { City } from '../domain/city/city';

export abstract class CityRepository {
  abstract save(city: City): Promise<void>;
  abstract find(id: string): Promise<City>;
  abstract findAll(): Promise<City[]>;
}
