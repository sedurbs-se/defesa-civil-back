import { Body, Controller, Post } from '@nestjs/common';
import { CreateAffected } from './CriarAfetado';
import { CreateAffectedDTO } from '../../dtos/CreateAffectedDTO';

@Controller()
export class CreateAffectedController {
  constructor(private readonly service: CreateAffected) {}

  @Post('/affected')
  async handle(@Body() body: CreateAffectedDTO) {
    const a = await this.service.execute(body);

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
