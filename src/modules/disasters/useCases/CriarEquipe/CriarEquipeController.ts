import { Body, Controller, Post } from '@nestjs/common';
import { CriarEquipe } from './CriarEquipe';
import { CreateTeamDTO } from '../../dtos/CreateTeamDTO';

@Controller()
export class CriarEquipeController {
  constructor(private criarEquipe: CriarEquipe) {}

  @Post('/team')
  async handle(@Body() body: CreateTeamDTO) {
    await this.criarEquipe.execute(body);
  }
}
