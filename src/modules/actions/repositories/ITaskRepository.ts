import { Task } from '../domain/task';

export interface FindTasksOptions {
  acaoId?: string;
}

export abstract class TaskRepository {
  abstract save(task: Task | null): Promise<void>;
  abstract find(id: string): Promise<Task>;
  abstract findAll(options: FindTasksOptions): Promise<Task[]>;
}
