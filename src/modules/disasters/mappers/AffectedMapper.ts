import { Afetado } from '@prisma/client';
import { Affected } from '../domain/affected/affected';

export class AffectedMapper {
  static toDomain(raw: Afetado) {
    return new Affected({
      id: raw.id,
      age: raw.idade,
      name: raw.nome,
      sex: raw.sexo,
      contact: raw.contato,
      cpf: raw.cpf,
      fl_chefe_familia: raw.fl_chefe_familia,
      unidadeHabitacionalId: raw.unidadeHabitacionalId,
    });
  }

  static toPersistence(affected: Affected) {
    return {
      id: affected.id,
      idade: affected.age,
      contato: affected.contact,
      cpf: affected.cpf,
      fl_chefe_familia: affected.fl_chefe_familia,
      nome: affected.name,
      sexo: affected.sex,
      unidadeHabitacionalId: affected.unidadeHabitacionalId,
    };
  }
}
