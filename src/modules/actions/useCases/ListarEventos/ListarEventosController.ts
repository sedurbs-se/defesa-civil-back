import { Controller, Get, Param } from '@nestjs/common';
import { ListarEventos } from './ListarEventos';

@Controller()
export class ListarEventosController {
  constructor(private readonly listEvents: ListarEventos) {}

  @Get('/task/:id/event')
  async execute(@Param('id') id: string) {
    const options = {
      taskId: id,
    };

    const events = await this.listEvents.execute(options);

    const eventsDTO = events.map((event) => ({
      ...event.props,
    }));

    return {
      ok: true,
      result: eventsDTO,
    };
  }
}
