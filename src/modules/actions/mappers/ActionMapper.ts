import { Acao } from '@prisma/client';
import { Action } from '../domain/action';

export class ActionMapper {
  static toDomain(raw: Acao) {
    return new Action({
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

  static toPersistence(action: Action): Acao {
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
