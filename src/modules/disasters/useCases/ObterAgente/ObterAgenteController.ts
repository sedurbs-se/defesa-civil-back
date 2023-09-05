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
      user_id: response.usuarioId,
      function: response.funcao,
      contact: response.contato,
      name: response.user.nome,
      cpf: response.user.cpf,
    };
  }
}
