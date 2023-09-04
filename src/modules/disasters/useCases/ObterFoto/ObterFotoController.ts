import { Controller, Param, Get, StreamableFile } from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import { AppError } from 'src/core/logic/error';

@Controller()
export class ObterFotoController {
  @Get('/photo/:link')
  async execute(@Param('link') link: string) {
    const file = join(process.env.TMP_FOLDER, link);

    if (!existsSync(file)) {
      throw new AppError('Arquivo não encontrado', 404);
    }

    const stream = createReadStream(file);

    return new StreamableFile(stream);
  }
}
