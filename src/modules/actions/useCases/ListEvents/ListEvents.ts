import { Injectable } from '@nestjs/common';
import { EventRepository } from '../../repositories/IEventRepository';

interface ListEventsRequest {
  taskId: string;
}

@Injectable()
export class ListEvents {
  constructor(private readonly eventRepository: EventRepository) {}

  async execute(request: ListEventsRequest) {
    return await this.eventRepository.findAll({
      tarefaId: request.taskId,
    });
  }
}
