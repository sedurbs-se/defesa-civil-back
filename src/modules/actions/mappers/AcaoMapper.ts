import { Acao as PersistenceAcao } from '@prisma/client';
import { Acao } from '../domain/acao';

export class AcaoMapper {
  static toDomain(raw: PersistenceAcao) {
    return new Acao({
      id: raw.id,
      context: raw.contexto,
      housingUnitId: raw.unidadeHabitacionalId,
      typeId: raw.tipoAcaoId,
      affectedAreaId: raw.areaAfetadaId,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }

  static toPersistence(action: Acao): PersistenceAcao {
    return {
      id: action.id,
      tipoAcaoId: action.typeId,
      unidadeHabitacionalId: action.housingUnitId,
      contexto: action.context,
      areaAfetadaId: action.affectedAreaId,
      createdAt: action.createdAt,
      updatedAt: action.updatedAt,
      deletedAt: action.deletedAt,
    };
  }
}
