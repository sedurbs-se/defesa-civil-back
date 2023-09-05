import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ImageRepository } from './repositories/ImageRepository';
import { PrismaImageRepository } from './repositories/prisma/PrismaImageRepository';
import { UploadImageController } from './useCases/UploadImage/UploadImageController';
import { GetImageController } from './useCases/GetImage/GetImageController';
import { UploadImage } from './useCases/UploadImage/UploadImage';
import { GetImage } from './useCases/GetImage/GetImage';

@Module({
  imports: [],
  controllers: [
    UploadImageController,
    // ListImagesController,
    // DeleteImageController,
    GetImageController,
  ],
  providers: [
    {
      provide: ImageRepository,
      useClass: PrismaImageRepository,
    },
    PrismaService,
    UploadImage,
    GetImage,
  ],
})
export class ImageModule {}
