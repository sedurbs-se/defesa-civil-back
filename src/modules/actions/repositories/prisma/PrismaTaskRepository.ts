import { Injectable } from '@nestjs/common';
import { TaskMapper } from '../../mappers/TaskMapper';
import { PrismaService } from 'src/prisma.service';
import { FindTasksOptions, TaskRepository } from '../ITaskRepository';
import { Task } from '../../domain/task';

@Injectable()
export class PrismaTaskRepository implements TaskRepository {
  constructor(readonly prisma: PrismaService) {}
  async save(task: Task): Promise<void> {
    const tarefa = TaskMapper.toPersistence(task);
    await this.prisma.tarefa.upsert({
      where: { id: tarefa.id },
      update: tarefa,
      create: tarefa,
    });
  }
  async find(id: string): Promise<Task | null> {
    const tarefa = await this.prisma.tarefa.findUnique({
      where: { id },
    });
    if (!tarefa) return null;
    return TaskMapper.toDomain(tarefa);
  }
  async findAll(options: FindTasksOptions): Promise<Task[]> {
    const tarefas = await this.prisma.tarefa.findMany({
      where: options,
    });
    return tarefas.map(TaskMapper.toDomain);
  }
}
