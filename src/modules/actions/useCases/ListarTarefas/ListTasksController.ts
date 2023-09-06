import { Controller, Get, Param } from '@nestjs/common';
import { ListTasks } from './ListTasks';

@Controller()
export class ListTasksController {
  constructor(private readonly listTasks: ListTasks) {}

  @Get('/action/:id/task')
  async execute(@Param('id') id: string) {
    const options = {
      actionId: id,
    };

    const tasks = await this.listTasks.execute(options);

    const tasksDTO = tasks.map((task) => ({
      id: task.id,
      acaoId: task.acaoId,
      itemBasicoId: task.itemBasicoId,
      nome: task.nome,
      quantificavel: task.quantificavel,
      status: task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      deletedAt: task.deletedAt,
      eventos: task.eventos.map((evento) => ({
        id: evento.id,
        tarefaId: evento.tarefaId,
        descricao: evento.descricao,
        tipoEventoId: evento.tipoEventoId,
        fotoId: evento.fotoId,
        quantidade: evento.quantidade,
        createdAt: evento.createdAt,
        updatedAt: evento.updatedAt,
        deletedAt: evento.deletedAt,
        tipoEvento: { ...evento.tipoEvento.props },
      })),
    }));

    return tasksDTO;
  }
}
