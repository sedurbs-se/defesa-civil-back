import { Afetado as PersistenceAfetado } from '@prisma/client';
import { Afetado } from '../domain/afetado/afetado';

export class AfetadoMapper {
  static toDomain(raw: PersistenceAfetado) {
    return new Afetado({
      id: raw.id,
      idade: raw.idade,
      nome: raw.nome,
      sexo: raw.sexo,
      contato: raw.contato,
      cpf: raw.cpf,
      fl_chefe_familia: raw.fl_chefe_familia,
      unidadeHabitacionalId: raw.unidadeHabitacionalId,
    });
  }

  static toPersistence(affected: Afetado) {
    return {
      id: affected.id,
      idade: affected.idade,
      contato: affected.contato,
      cpf: affected.cpf,
      fl_chefe_familia: affected.fl_chefe_familia,
      nome: affected.nome,
      sexo: affected.sexo,
      unidadeHabitacionalId: affected.unidadeHabitacionalId,
    };
  }
}
