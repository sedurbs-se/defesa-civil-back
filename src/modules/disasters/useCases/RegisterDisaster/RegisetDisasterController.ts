import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDisaster } from './RegisterDisaster';
import { CreateDisasterDTO } from '../../dtos/CreateDisasterDTO';
import { Disaster } from '../../domain/disaster/disaster';

@Controller()
export class RegisterDisasterController {
  constructor(private readonly registerDisaster: RegisterDisaster) {}

  @Post('/disaster')
  async execute(@Body() body: CreateDisasterDTO): Promise<Disaster> {
    return await this.registerDisaster.execute(body);
  }
}
