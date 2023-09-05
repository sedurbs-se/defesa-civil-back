import {
  Controller,
  Post,
  UseInterceptors,
  Param,
  UploadedFiles,
  Body,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CriarFotos } from './CriarFotos';
import { randomUUID } from 'crypto';
import { AppError } from 'src/core/logic/error';
import { CreatePhotosDTO } from '../../dtos/CreatePhotosDTO';

@Controller()
export class CriarFotosController {
  constructor(private readonly criarFotos: CriarFotos) {}

  @Post('/upload/:unidade_habitacional_id')
  @UseInterceptors(
    FilesInterceptor('files', 30, {
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
  async handle(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: CreatePhotosDTO,
    @Param('unidade_habitacional_id') unidade_habitacional_id: string,
  ) {
    if (!files) throw new AppError('Arquivo não enviado');

    if (files.length === 0)
      throw new AppError('Pelo menos 1 arquivo deve ser enviado');

    await this.criarFotos.execute(
      unidade_habitacional_id,
      files.map((f) => f.filename),
      body.type,
    );
  }
}