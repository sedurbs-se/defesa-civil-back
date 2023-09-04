import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { AppError } from 'src/core/logic/error';
import { UploadImage } from './UploadImage';
import { Image } from '../../domain/image';

@Controller()
export class UploadImageController {
  constructor(private readonly uploadImage: UploadImage) {}

  @Post('/img/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.env.TMP_FOLDER,
        filename: (req, file, cb) => {
          const uniqueSuffix = randomUUID();
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}-${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async handle(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new AppError('Arquivo não enviado');

    const image = new Image({
      url: file.filename,
    });

    const newImg = await this.uploadImage.execute(image);

    return {
      ok: true,
      result: {
        ...newImg.props,
      },
    };
  }
}
