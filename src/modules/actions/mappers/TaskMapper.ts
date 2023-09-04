import { Tarefa } from '@prisma/client';
import { Task } from '../domain/task';

export class TaskMapper {
  static toDomain(raw: Tarefa) {
    return new Task({
      id: raw.id,
      actionId: raw.acaoId,
      basicItemId: raw.itemBasicoId,
      name: raw.nome,
      quantificable: raw.quantificavel,
      status: raw.status,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }

  static toPersistence(task: Task): Tarefa {
    return {
      id: task.id,
      acaoId: task.actionId,
      itemBasicoId: task.basicItemId,
      nome: task.name,
      quantificavel: task.quantificable,
      status: task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      deletedAt: task.deletedAt,
    };
  }
}
