import { Task } from '../domain/task';

export abstract class TaskRepository {
  abstract save(task: Task | null): Promise<void>;
  abstract find(id: string): Promise<Task>;
  abstract findAll(): Promise<Task[]>;
}
