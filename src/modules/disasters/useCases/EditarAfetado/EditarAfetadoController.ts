import { Body, Controller, Param, Put } from '@nestjs/common';
import { CreateAffectedDTO } from '../../dtos/CreateAffectedDTO';
import { EditarAfetado } from './EditarAfetado';

@Controller()
export class EditarAfetadoController {
  constructor(private readonly service: EditarAfetado) {}

  @Put('/affected/:id')
  async handle(@Body() body: CreateAffectedDTO, @Param('id') id: string) {
    const a = await this.service.execute(body, id);

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
