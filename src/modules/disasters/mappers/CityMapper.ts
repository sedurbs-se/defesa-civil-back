import { Municipio as PersistenceCity } from '@prisma/client';
import { City } from '../domain/city/city';


export class CityMapper {
  static toDomain(raw: PersistenceCity) {
    return new City({
      id: raw.id,
      name: raw.nome,
    });
  }

  static async toPersistence(city: City) {
    return {
      id: city.id,
      nome: city.name,
    };
  }
}
