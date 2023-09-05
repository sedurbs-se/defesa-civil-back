import { Controller, Body, Post } from '@nestjs/common';
import { DeletarFotos } from './DeletarFotos';
import { DeletePhotosDTO } from '../../dtos/DeletePhotosDTO';

@Controller()
export class DeletarFotosController {
  constructor(private readonly deletarFotos: DeletarFotos) {}

  @Post('/photos')
  async handle(@Body() body: DeletePhotosDTO) {
    await this.deletarFotos.execute(body.deletedIds);
  }
}
