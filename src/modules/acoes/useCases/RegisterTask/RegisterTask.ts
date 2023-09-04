import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../../repositories/TarefaRepository';
import { Task } from '../../domain/tarefa';

interface RegisterTaskRequest {
  task: Task;
}

@Injectable()
export class RegisterTask {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({ task }: RegisterTaskRequest) {
    await this.taskRepository.save(task);
  }
}
