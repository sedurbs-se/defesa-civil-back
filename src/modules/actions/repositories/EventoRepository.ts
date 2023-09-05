import { Evento } from '../domain/evento';

export interface FindEventsOptions {
  tarefaId?: string;
}

export abstract class EventoRepository {
  abstract save(event: Evento | null): Promise<void>;
  abstract find(id: string): Promise<Evento>;
  abstract findAll(options: FindEventsOptions): Promise<Evento[]>;
}
