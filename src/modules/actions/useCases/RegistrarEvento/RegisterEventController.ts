import { Body, Controller, Post } from '@nestjs/common';
import { RegisterEvent } from './RegisterEvent';
import { RegistrarEventoDTO } from '../../dtos/RegistrarEventoDTO';
import { Evento } from '../../domain/evento';

@Controller()
export class RegisterEventController {
  constructor(private readonly registerEvent: RegisterEvent) {}

  @Post('/event')
  async execute(@Body() body: RegistrarEventoDTO) {
    const evento = new Evento(body);
    await this.registerEvent.execute({ evento });

    return {
      ok: true,
    };
  }
}
