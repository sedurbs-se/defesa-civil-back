import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { EventoRepository, FindEventsOptions } from '../EventoRepository';
import { Evento } from '../../domain/evento';
import { EventMapper } from '../../mappers/EventMapper';

@Injectable()
export class PrismaEventRepository implements EventoRepository {
  constructor(readonly prisma: PrismaService) {}
  async save(event: Evento): Promise<void> {
    const evento = EventMapper.toPersistence(event);
    await this.prisma.evento.upsert({
      where: { id: evento.id },
      update: evento,
      create: evento,
    });
  }
  async find(id: string): Promise<Evento | null> {
    const event = await this.prisma.evento.findUnique({
      where: { id },
    });
    if (!event) return null;
    return EventMapper.toDomain(event);
  }
  async findAll(options: FindEventsOptions): Promise<Evento[]> {
    const events = await this.prisma.evento.findMany({
      where: options,
    });
    return events.map(EventMapper.toDomain);
  }
}
