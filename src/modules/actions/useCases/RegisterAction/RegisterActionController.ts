import { Body, Controller, Post } from '@nestjs/common';
import { RegisterAction } from './RegisterAction';
import { RegisterActionDTO } from '../../dtos/RegisterActionDTO';
import { Acao } from '../../domain/acao';

@Controller()
export class RegisterActionController {
  constructor(private readonly registerAction: RegisterAction) {}

  @Post('/action')
  async execute(@Body() body: RegisterActionDTO) {
    const action = new Acao(body);
    await this.registerAction.execute({ action });

    return {
      ok: true,
    };
  }
}
