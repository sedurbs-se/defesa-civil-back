import { Injectable } from '@nestjs/common';
import { EventoRepository } from '../../repositories/EventoRepository';

interface ListarEventosRequest {
  taskId: string;
}

@Injectable()
export class ListarEventos {
  constructor(private readonly eventRepository: EventoRepository) {}

  async execute(request: ListarEventosRequest) {
    return await this.eventRepository.findAll({
      tarefaId: request.taskId,
    });
  }
}
