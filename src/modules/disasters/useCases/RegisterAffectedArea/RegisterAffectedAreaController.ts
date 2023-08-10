import { Body, Controller, Post } from '@nestjs/common';
import { CreateAffectedAreaDTO } from '../../dtos/CreateAffectedAreaDTO';
import { CreateAffectedArea } from './RegisterAffectedArea';

@Controller()
export class RegisterAreaController {
  constructor(private readonly createAffectedArea: CreateAffectedArea) {}

  @Post('/area')
  async execute(@Body() body: CreateAffectedAreaDTO) {
    const affectedArea = await this.createAffectedArea.execute(body);

    return {
      id: affectedArea.id,
      name: affectedArea.name,
      order: affectedArea.order,
      disasterId: affectedArea.disasterId,
    };
  }
}
