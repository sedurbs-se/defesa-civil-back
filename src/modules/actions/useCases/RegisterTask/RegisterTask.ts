import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../../repositories/ITaskRepository';
import { Task } from '../../domain/task';

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
