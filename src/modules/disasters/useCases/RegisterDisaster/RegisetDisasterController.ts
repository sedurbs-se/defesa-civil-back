import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDisaster } from './RegisterDisaster';
import { CreateDisasterDTO } from '../../dtos/CreateDisasterDTO';

@Controller()
export class RegisterDisasterController {
  constructor(private readonly registerDisaster: RegisterDisaster) {}

  @Post('/disaster')
  async execute(@Body() body: CreateDisasterDTO) {
    const d = await this.registerDisaster.execute(body);

    return {
      id: d.id,
      date: d.date,
      cityId: d.cityId,
    };
  }
}
