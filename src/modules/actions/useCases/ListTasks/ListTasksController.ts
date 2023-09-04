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
      ...task.props,
    }));

    return {
      ok: true,
      result: tasksDTO,
    };
  }
}
