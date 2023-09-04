import { Controller, Get, Param } from '@nestjs/common';
import { ObterAfetado } from './ObterAfetado';

@Controller()
export class GetAffectedController {
  constructor(private obterAfetado: ObterAfetado) {}

  @Get('/affected/:id')
  async handle(@Param('id') id: string) {
    const a = await this.obterAfetado.execute(id);

    return {
      id: a.id,
      name: a.name,
      age: a.age,
      sex: a.sex,
      cpf: a.cpf,
      contact: a.contact,
      fl_chefe_familia: a.fl_chefe_familia,
      unidadeHabitacionalId: a.unidadeHabitacionalId,
    };
  }
}
