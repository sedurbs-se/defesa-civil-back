import { Body, Controller, Post } from '@nestjs/common';
import { RegisterTask } from './RegisterTask';
import { Task } from '../../domain/task';
import { RegisterTaskDTO } from '../../dtos/RegisterTaskDTO';

@Controller()
export class RegisterTaskController {
  constructor(private readonly registerTask: RegisterTask) {}

  @Post('/task')
  async execute(@Body() body: RegisterTaskDTO) {
    const task = new Task({
      ...body,
      status: 'pending',
    });
    await this.registerTask.execute({ task });

    return {
      ok: true,
    };
  }
}
