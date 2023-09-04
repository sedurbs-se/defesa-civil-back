import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { EventRepository, FindEventsOptions } from '../IEventRepository';
import { Event } from '../../domain/event';
import { EventMapper } from '../../mappers/EventMapper';

@Injectable()
export class PrismaEventRepository implements EventRepository {
  constructor(readonly prisma: PrismaService) {}
  async save(event: Event): Promise<void> {
    const evento = EventMapper.toPersistence(event);
    await this.prisma.evento.upsert({
      where: { id: evento.id },
      update: evento,
      create: evento,
    });
  }
  async find(id: string): Promise<Event | null> {
    const event = await this.prisma.evento.findUnique({
      where: { id },
    });
    if (!event) return null;
    return EventMapper.toDomain(event);
  }
  async findAll(options: FindEventsOptions): Promise<Event[]> {
    const events = await this.prisma.evento.findMany({
      where: options,
    });
    return events.map(EventMapper.toDomain);
  }
}
