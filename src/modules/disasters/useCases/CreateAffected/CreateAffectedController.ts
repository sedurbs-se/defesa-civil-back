import { Body, Injectable, Post } from '@nestjs/common';
import { CreateAffected } from './CreateAffected';
import { CreateAffectedDTO } from '../../dtos/CreateAffectedDTO';

@Injectable()
export class CreateAffectedController {
  constructor(private readonly service: CreateAffected) {}

  @Post('/affected')
  async handle(@Body() body: CreateAffectedDTO) {
    await this.service.execute(body);
  }
}
