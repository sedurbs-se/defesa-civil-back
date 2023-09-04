import { Controller, Get, Param, Query } from '@nestjs/common';
import { ListEvents } from './ListEvents';

@Controller()
export class ListEventsController {
  constructor(private readonly listEvents: ListEvents) {}

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
