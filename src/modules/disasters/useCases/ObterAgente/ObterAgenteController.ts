import { Controller, Get, Param } from '@nestjs/common';
import { ObterAgente } from './ObterAgente';

@Controller()
export class ObterAgenteController {
  constructor(private obterAgente: ObterAgente) {}

  @Get('/agent/:id')
  async handle(@Param('id') id: string) {
    const response = await this.obterAgente.execute(id);

    if (!response) return {};

    return {
      id: response.id,
      user_id: response.user_id,
      function: response.function,
      contact: response.contact,
      name: response.user.name,
      cpf: response.user.cpf,
    };
  }
}
