import { Body, Controller, Param, Put } from '@nestjs/common';
import { CreateAffectedDTO } from '../../dtos/CreateAffectedDTO';
import { UpdateAffected } from './UpdateAffected';

@Controller()
export class UpdateAffectedController {
  constructor(private readonly service: UpdateAffected) {}

  @Put('/affected/:id')
  async handle(@Body() body: CreateAffectedDTO, @Param('id') id: string) {
    const a = await this.service.execute(body, id);

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
