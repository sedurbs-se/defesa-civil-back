import { Acao } from '@prisma/client';
import { Action } from '../domain/action/action';

export class ActionMapper {
  static toDomain(raw: Acao) {
    return new Action({
      id: raw.id,
      type: raw.tipo,
      housingUnitId: raw.unidadeHabitacionalId,
      affectedAreaId: raw.areaAfetadaId,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistence(action: Action) {
    return {
      id: action.id,
      afetado_contato: action.afected_contact,
      afetado_nome: action.afected_name,
      afetado_cpf: action.afected_cpf,
      tipo: action.type,
      unidadeHabitacionalId: action.housingUnitId,
      createdAt: action.createdAt,
      updatedAt: action.updatedAt,
    };
  }
}
