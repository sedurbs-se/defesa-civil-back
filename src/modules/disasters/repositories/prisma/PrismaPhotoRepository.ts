import { PrismaService } from 'src/prisma.service';
import { PhotosRepository } from '../IPhotosRepository';
import { Injectable } from '@nestjs/common';
import { Photos } from '../../domain/photos/photos';
import { PhotosMapper } from '../../mappers/PhotoMapper';

@Injectable()
export class PrismaPhotoRepository implements PhotosRepository {
  constructor(private prisma: PrismaService) {}

  async save(photos: Photos[]): Promise<void> {
    // const p = PhotosMapper.toPersistence(photo);

    // await this.prisma.fotoUnidade.create({
    //   data: p,
    // });
    await this.prisma.fotoUnidade.createMany({
      data: photos.map((p) => PhotosMapper.toPersistence(p)),
    });
  }

  async find(id: string): Promise<Photos> {
    const photo = await this.prisma.fotoUnidade.findUnique({
      where: {
        id,
      },
    });
    if (!photo) {
      return null;
    }

    return PhotosMapper.toDomain(photo);
  }

  async delete(ids: string[]): Promise<void> {
    await this.prisma.fotoUnidade.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
