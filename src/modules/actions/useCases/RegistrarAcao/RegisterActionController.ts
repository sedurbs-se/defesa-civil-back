import { Body, Controller, Post } from '@nestjs/common';
import { RegisterAction } from './RegisterAction';
import { RegistrarAcaoDTO } from '../../dtos/RegistrarAcaoDTO';
import { Acao } from '../../domain/acao/acao';

@Controller()
export class RegisterActionController {
  constructor(private readonly registerAction: RegisterAction) {}

  @Post('/action')
  async execute(@Body() body: RegistrarAcaoDTO) {
    const action = new Acao(body);
    await this.registerAction.execute({ action });

    return {
      ok: true,
    };
  }
}
