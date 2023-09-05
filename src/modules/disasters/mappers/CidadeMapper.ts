import { Municipio as PersistenceCity } from '@prisma/client';
import { Cidade } from '../domain/cidade/cidade';

export class CidadeMapper {
  static toDomain(raw: PersistenceCity) {
    return new Cidade({
      id: raw.id,
      nome: raw.nome,
    });
  }

  static async toPersistence(city: Cidade) {
    return {
      id: city.id,
      nome: city.nome,
    };
  }
}
