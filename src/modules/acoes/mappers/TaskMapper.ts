import { Tarefa as PersistenceTarefa } from '@prisma/client';
import { Tarefa } from '../domain/tarefa';

export class TaskMapper {
  static toDomain(raw: PersistenceTarefa) {
    return new Tarefa({
      id: raw.id,
      acaoId: raw.acaoId,
      itemBasicoId: raw.itemBasicoId,
      nome: raw.nome,
      quantificavel: raw.quantificavel,
      status: raw.status,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }

  static toPersistence(task: Tarefa): PersistenceTarefa {
    return {
      id: task.id,
      acaoId: task.acaoId,
      itemBasicoId: task.itemBasicoId,
      nome: task.nome,
      quantificavel: task.quantificavel,
      status: task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      deletedAt: task.deletedAt,
    };
  }
}
