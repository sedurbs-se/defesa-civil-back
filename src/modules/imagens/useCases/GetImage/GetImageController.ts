import { Controller, Param, Get, StreamableFile } from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import { AppError } from 'src/core/logic/error';
import { GetImage } from './GetImage';

@Controller()
export class GetImageController {
  constructor(private readonly getImage: GetImage) {}
  @Get('/img/:id')
  async execute(@Param('id') id: string) {
    const image = await this.getImage.execute(id);

    const file = join(process.env.TMP_FOLDER, image.url);

    if (!existsSync(file)) {
      throw new AppError('Arquivo não encontrado', 404);
    }

    const stream = createReadStream(file);

    return new StreamableFile(stream);
  }
}
