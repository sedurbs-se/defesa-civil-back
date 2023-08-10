import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreatePhoto } from './CreatePhoto';

@Controller()
export class CreatePhotoController {
  constructor(private readonly createPhoto: CreatePhoto) {}

  @Post('/upload/:unidade_habitacional_id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.env.TMP_FOLDER,
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.originalname}-${uniqueSuffix}-${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async handle(
    @UploadedFile() file: Express.Multer.File,
    @Param('unidade_habitacional_id') unidade_habitacional_id: string,
  ) {
    if (!file) {
      throw new Error('Arquivo não encontrado');
    }

    await this.createPhoto.execute(unidade_habitacional_id, file.filename);
  }
}
