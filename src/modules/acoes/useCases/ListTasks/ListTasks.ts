import { Injectable } from '@nestjs/common';
import { TarefaRepository } from '../../repositories/TarefaRepository';

interface ListTasksRequest {
  actionId?: string;
}

@Injectable()
export class ListTasks {
  constructor(private readonly taskRepository: TarefaRepository) {}

  async execute(request: ListTasksRequest) {
    return await this.taskRepository.findAll({
      acaoId: request.actionId,
    });
  }
}
