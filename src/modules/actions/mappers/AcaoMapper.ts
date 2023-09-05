import { Acao as PersistenceAcao } from '@prisma/client';
import { Acao } from '../domain/acao';

export class AcaoMapper {
  static toDomain(raw: PersistenceAcao) {
    return new Acao({
      id: raw.id,
      contexto: raw.contexto,
      unidadeHabitacionalId: raw.unidadeHabitacionalId,
      tipoId: raw.tipoAcaoId,
      areaAfetadaId: raw.areaAfetadaId,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }

  static toPersistence(action: Acao): PersistenceAcao {
    return {
      id: action.id,
      tipoAcaoId: action.tipoId,
      unidadeHabitacionalId: action.unidadeHabitacionalId,
      contexto: action.contexto,
      areaAfetadaId: action.areaAfetadaId,
      createdAt: action.createdAt,
      updatedAt: action.updatedAt,
      deletedAt: action.deletedAt,
    };
  }
}
