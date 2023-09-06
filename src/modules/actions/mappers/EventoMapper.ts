import { Evento as PersistenceEvento } from '@prisma/client';
import { Evento } from '../domain/evento/evento';

export class EventoMapper {
  static toDomain(raw: PersistenceEvento) {
    return new Evento({
      id: raw.id,
      descricao: raw.descricao,
      tipoEventoId: raw.tipoEventoId,
      fotoId: raw.fotoId,
      quantidade: raw.quantidade,
      tarefaId: raw.tarefaId,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }

  static toPersistence(event: Evento): PersistenceEvento {
    return {
      id: event.id,
      descricao: event.descricao,
      tipoEventoId: event.tipoEventoId,
      fotoId: event.fotoId,
      quantidade: event.quantidade,
      tarefaId: event.tarefaId,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      deletedAt: event.deletedAt,
    };
  }
}
