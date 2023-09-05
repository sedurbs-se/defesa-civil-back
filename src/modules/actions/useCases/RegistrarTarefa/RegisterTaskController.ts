import { Body, Controller, Post } from '@nestjs/common';
import { RegisterTask } from './RegisterTask';
import { Tarefa } from '../../domain/tarefa';
import { RegistrarTarefaDTO } from '../../dtos/RegistrarTarefaDTO';

@Controller()
export class RegisterTaskController {
  constructor(private readonly registerTask: RegisterTask) {}

  @Post('/task')
  async execute(@Body() body: RegistrarTarefaDTO) {
    const task = new Tarefa({
      ...body,
      status: 'pendente',
    });
    await this.registerTask.execute({ task });

    return {
      ok: true,
    };
  }
}
