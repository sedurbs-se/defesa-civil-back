import { Injectable } from '@nestjs/common';
import { TarefaMapper } from '../../mappers/TarefaMapper';
import { PrismaService } from 'src/prisma.service';
import { FindTasksOptions, TarefaRepository } from '../TarefaRepository';
import { Tarefa } from '../../domain/tarefa';

@Injectable()
export class PrismaTaskRepository implements TarefaRepository {
  constructor(readonly prisma: PrismaService) {}
  async save(task: Tarefa): Promise<void> {
    const tarefa = TarefaMapper.toPersistence(task);
    await this.prisma.tarefa.upsert({
      where: { id: tarefa.id },
      update: tarefa,
      create: tarefa,
    });
  }
  async find(id: string): Promise<Tarefa | null> {
    const tarefa = await this.prisma.tarefa.findUnique({
      where: { id },
    });
    if (!tarefa) return null;
    return TarefaMapper.toDomain(tarefa);
  }
  async findAll(options: FindTasksOptions): Promise<Tarefa[]> {
    const tarefas = await this.prisma.tarefa.findMany({
      where: options,
      include: {
        eventos: {
          include: {
            tipoEvento: true,
          },
        },
      },
    });
    return tarefas.map(TarefaMapper.toDomainWithEventos);
  }
}
