import { Body, Controller, Param, Put } from '@nestjs/common';
import { CreateTeamDTO } from '../../dtos/CreateTeamDTO';
import { EditTeam } from './EditTeam';

@Controller()
export class EditTeamController {
  constructor(private editTeam: EditTeam) {}

  @Put('/team/:id')
  async handle(@Param('id') id: string, @Body() body: CreateTeamDTO) {
    const response = await this.editTeam.execute(id, body);

    return response;
  }
}
