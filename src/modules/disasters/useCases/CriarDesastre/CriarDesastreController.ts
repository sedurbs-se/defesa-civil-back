import { Body, Controller, Post } from '@nestjs/common';
import { CriarDesastre } from './CriarDesastre';
import { CreateDisasterDTO } from '../../dtos/CreateDisasterDTO';

@Controller()
export class CriarDesastreController {
  constructor(private readonly criarDesastre: CriarDesastre) {}

  @Post('/disaster')
  async execute(@Body() body: CreateDisasterDTO) {
    const d = await this.criarDesastre.execute(body);

    return {
      id: d.id,
      date: d.data,
      cityId: d.cidadeId,
    };
  }
}
