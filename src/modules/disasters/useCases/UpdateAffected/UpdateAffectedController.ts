import { Body, Injectable, Param, Post } from '@nestjs/common';
import { CreateAffectedDTO } from '../../dtos/CreateAffectedDTO';
import { UpdateAffected } from './UpdateAffected';

@Injectable()
export class UpdateAffectedController {
  constructor(private readonly service: UpdateAffected) {}

  @Post('/affected/:id')
  async handle(@Body() body: CreateAffectedDTO, @Param('id') id: string) {
    await this.service.execute(body, id);
  }
}
