import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../../repositories/ITaskRepository';

interface ListTasksRequest {
  actionId?: string;
}

@Injectable()
export class ListTasks {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(request: ListTasksRequest) {
    return await this.taskRepository.findAll({
      acaoId: request.actionId,
    });
  }
}
