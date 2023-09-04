import { Controller, Get } from '@nestjs/common';
import { ListarAgentes } from './ListarAgentes';

@Controller()
export class ListAgentsController {
  constructor(private listarAgentes: ListarAgentes) {}

  @Get('/agent')
  async handle() {
    const response = await this.listarAgentes.execute();

    return response;
  }
}
