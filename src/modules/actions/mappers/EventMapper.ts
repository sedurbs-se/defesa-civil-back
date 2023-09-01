import { Evento } from '@prisma/client';
import { Event } from '../domain/event';

export class EventMapper {
  static toDomain(raw: Evento) {
    return new Event({
      id: raw.id,
      description: raw.descricao,
      eventTypeId: raw.tipoEventoId,
      photo: raw.foto,
      quantity: raw.quantidade,
      taskId: raw.tarefaId,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }

  static toPersistence(event: Event): Evento {
    return {
      id: event.id,
      descricao: event.description,
      tipoEventoId: event.eventTypeId,
      foto: event.photo,
      quantidade: event.quantity,
      tarefaId: event.taskId,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      deletedAt: event.deletedAt,
    };
  }
}
