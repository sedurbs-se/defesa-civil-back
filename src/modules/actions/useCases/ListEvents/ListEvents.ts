import { Injectable } from '@nestjs/common';
import { EventoRepository } from '../../repositories/EventoRepository';

interface ListEventsRequest {
  taskId: string;
}

@Injectable()
export class ListEvents {
  constructor(private readonly eventRepository: EventoRepository) {}

  async execute(request: ListEventsRequest) {
    return await this.eventRepository.findAll({
      tarefaId: request.taskId,
    });
  }
}
