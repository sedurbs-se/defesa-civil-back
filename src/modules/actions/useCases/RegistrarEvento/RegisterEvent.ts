import { Injectable } from '@nestjs/common';
import { EventoRepository } from '../../repositories/EventoRepository';
import { Evento } from '../../domain/evento/evento';

interface RegisterEventRequest {
  evento: Evento;
}

@Injectable()
export class RegisterEvent {
  constructor(private readonly eventRepository: EventoRepository) {}

  async execute({ evento }: RegisterEventRequest) {
    await this.eventRepository.save(evento);
  }
}
