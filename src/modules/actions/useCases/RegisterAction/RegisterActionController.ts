import { Body, Controller, Post } from '@nestjs/common';
import { RegisterAction } from './RegisterAction';
import { RegisterActionDTO } from '../../dtos/RegisterActionDTO';
import { Action } from '../../domain/action';

@Controller()
export class RegisterActionController {
  constructor(private readonly registerAction: RegisterAction) {}

  @Post('/action')
  async execute(@Body() body: RegisterActionDTO) {
    console.log('teste');
    const action = new Action(body);
    await this.registerAction.execute({ action });

    return {
      ok: true,
    };
  }
}
