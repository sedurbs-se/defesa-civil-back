import { Body, Controller, Post } from '@nestjs/common';
import { CreateAffectedAreaDTO } from '../../dtos/CreateAffectedAreaDTO';
import { CriarAreaAfetada } from './CriarAreaAfetada';

@Controller()
export class CriarAreaAfetadaController {
  constructor(private readonly criarAreaAfetada: CriarAreaAfetada) {}

  @Post('/area')
  async execute(@Body() body: CreateAffectedAreaDTO) {
    const affectedArea = await this.criarAreaAfetada.execute(body);

    return {
      id: affectedArea.id,
      name: affectedArea.name,
      order: affectedArea.order,
      disasterId: affectedArea.disasterId,
    };
  }
}
