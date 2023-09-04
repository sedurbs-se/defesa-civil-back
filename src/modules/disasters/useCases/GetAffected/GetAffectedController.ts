import { Controller, Get, Param } from '@nestjs/common';
import { GetAffected } from './GetAffected';

@Controller()
export class GetAffectedController {
  constructor(private getAffected: GetAffected) {}

  @Get('/affected/:id')
  async handle(@Param('id') id: string) {
    const a = await this.getAffected.execute(id);

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
