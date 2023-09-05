import { Body, Controller, Post } from '@nestjs/common';
import { RegisterTask } from './RegisterTask';
import { Tarefa } from '../../domain/tarefa';
import { RegisterTaskDTO } from '../../dtos/RegisterTaskDTO';

@Controller()
export class RegisterTaskController {
  constructor(private readonly registerTask: RegisterTask) {}

  @Post('/task')
  async execute(@Body() body: RegisterTaskDTO) {
    const task = new Tarefa({
      acaoId: body.actionId,
      itemBasicoId: body.basicItemId,
      nome: body.name,
      quantificavel: body.quantificable,
      status: 'pending',
    });
    await this.registerTask.execute({ task });

    return {
      ok: true,
    };
  }
}
