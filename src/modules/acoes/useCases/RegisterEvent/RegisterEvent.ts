import { Injectable } from '@nestjs/common';
import { EventRepository } from '../../repositories/EventoRepository';
import { Event } from '../../domain/evento';

interface RegisterEventRequest {
  event: Event;
}

@Injectable()
export class RegisterEvent {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute({ event }: RegisterEventRequest) {
    await this.eventRepository.save(event);
  }
}
