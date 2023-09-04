import { Event } from '../domain/event';

export interface FindEventsOptions {
  tarefaId?: string;
}

export abstract class EventRepository {
  abstract save(event: Event | null): Promise<void>;
  abstract find(id: string): Promise<Event>;
  abstract findAll(options: FindEventsOptions): Promise<Event[]>;
}
