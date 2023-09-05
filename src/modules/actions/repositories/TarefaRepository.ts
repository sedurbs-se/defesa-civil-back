import { Tarefa } from '../domain/tarefa';

export interface FindTasksOptions {
  acaoId?: string;
}

export abstract class TarefaRepository {
  abstract save(task: Tarefa | null): Promise<void>;
  abstract find(id: string): Promise<Tarefa>;
  abstract findAll(options: FindTasksOptions): Promise<Tarefa[]>;
}
