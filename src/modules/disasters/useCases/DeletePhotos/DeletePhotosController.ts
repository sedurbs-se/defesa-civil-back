import {
  Controller,
  Body,
  Post,
} from '@nestjs/common';
import { DeletePhotos } from './DeletePhotos';
import { DeletePhotosDTO } from '../../dtos/DeletePhotosDTO';

@Controller()
export class DeletePhotosController {
  constructor(private readonly deletePhotos: DeletePhotos) {}

  @Post('/photos')
  async handle(@Body() body: DeletePhotosDTO) {
    await this.deletePhotos.execute(body.deletedIds);
  }
}
