import { Body, Controller, Post } from '@nestjs/common';
import { RegisterEvent } from './RegisterEvent';
import { RegisterEventDTO } from '../../dtos/RegisterEventDTO';
import { Event } from '../../domain/evento';

@Controller()
export class RegisterEventController {
  constructor(private readonly registerEvent: RegisterEvent) {}

  @Post('/event')
  async execute(@Body() body: RegisterEventDTO) {
    const event = new Event({
      ...body,
    });
    await this.registerEvent.execute({ event });

    return {
      ok: true,
    };
  }
}
