import { Evento } from '@prisma/client';
import { Event } from '../domain/event';

export class EventMapper {
  static toDomain(raw: Evento) {
    return new Event({
      id: raw.id,
      description: raw.descricao,
      eventTypeId: raw.tipoEventoId,
      photoId: raw.fotoId,
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
      fotoId: event.photoId,
      quantidade: event.quantity,
      tarefaId: event.taskId,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      deletedAt: event.deletedAt,
    };
  }
}
