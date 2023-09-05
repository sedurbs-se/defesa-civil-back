import { Injectable } from '@nestjs/common';
import { EventoRepository } from '../../repositories/EventoRepository';
import { Evento } from '../../domain/evento';

interface RegisterEventRequest {
  event: Evento;
}

@Injectable()
export class RegisterEvent {
  constructor(private readonly eventRepository: EventoRepository) {}

  async execute({ event }: RegisterEventRequest) {
    await this.eventRepository.save(event);
  }
}
