import { Body, Controller, Post } from '@nestjs/common';
import { CriarAgente } from './CriarAgente';
import { CreateAgentDTO } from '../../dtos/CreateAgentDTO';

@Controller()
export class CriarAgenteController {
  constructor(private readonly criarAgente: CriarAgente) {}

  @Post('/agent')
  async handle(@Body() body: CreateAgentDTO) {
    await this.criarAgente.execute(body);
  }
}
