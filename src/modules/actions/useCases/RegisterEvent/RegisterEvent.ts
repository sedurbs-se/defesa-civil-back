import { Injectable } from '@nestjs/common';
import { EventRepository } from '../../repositories/IEventRepository';
import { Event } from '../../domain/event';

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
