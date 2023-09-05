import { Body, Controller, Param, Put } from '@nestjs/common';
import { CreateTeamDTO } from '../../dtos/CreateTeamDTO';
import { EditarEquipe } from './EditarEquipe';

@Controller()
export class EditarEquipeController {
  constructor(private editTeam: EditarEquipe) {}

  @Put('/team/:id')
  async handle(@Param('id') id: string, @Body() body: CreateTeamDTO) {
    const response = await this.editTeam.execute(id, body);

    return response;
  }
}
