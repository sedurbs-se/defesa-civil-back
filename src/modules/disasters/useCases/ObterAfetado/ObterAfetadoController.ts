import { Controller, Get, Param } from '@nestjs/common';
import { ObterAfetado } from './ObterAfetado';

@Controller()
export class ObterAfetadoController {
  constructor(private obterAfetado: ObterAfetado) {}

  @Get('/affected/:id')
  async handle(@Param('id') id: string) {
    const a = await this.obterAfetado.execute(id);

    return {
      id: a.id,
      name: a.nome,
      age: a.idade,
      sex: a.sexo,
      cpf: a.cpf,
      contact: a.contato,
      fl_chefe_familia: a.fl_chefe_familia,
      unidadeHabitacionalId: a.unidadeHabitacionalId,
    };
  }
}
