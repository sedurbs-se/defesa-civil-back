import { PrismaService } from 'src/prisma.service';
import { PhotosRepository } from '../IPhotosRepository';
import { Injectable } from '@nestjs/common';
import { Photos } from '../../domain/photos/photos';
import { PhotosMapper } from '../../mappers/PhotoMapper';

@Injectable()
export class PrismaPhotoRepository implements PhotosRepository {
  constructor(private prisma: PrismaService) {}

  async save(photo: Photos): Promise<void> {
    const p = PhotosMapper.toPersistence(photo);

    await this.prisma.fotoUnidade.create({
      data: p,
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

  async delete(id: string): Promise<void> {
    await this.prisma.fotoUnidade.delete({
      where: {
        id,
      },
    });
  }
}
