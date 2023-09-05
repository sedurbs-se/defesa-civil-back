import { Injectable } from '@nestjs/common';
import { TarefaRepository } from '../../repositories/TarefaRepository';
import { Tarefa } from '../../domain/tarefa';

interface RegisterTaskRequest {
  task: Tarefa;
}

@Injectable()
export class RegisterTask {
  constructor(private readonly taskRepository: TarefaRepository) {}

  async execute({ task }: RegisterTaskRequest) {
    await this.taskRepository.save(task);
  }
}
