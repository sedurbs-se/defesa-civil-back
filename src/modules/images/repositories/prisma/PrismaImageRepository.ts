import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';
import { ImageRepository } from '../ImageRepository';
import { Image } from '../../domain/image';
import { ImageMapper } from '../../mappers/ImageMapper';

@Injectable()
class PrismaImageRepository implements ImageRepository {
  constructor(private readonly prisma: PrismaService) {}
  async save(image: Image): Promise<Image> {
    const imagem = ImageMapper.toPersistence(image);
    const createdImg = await this.prisma.imagem.upsert({
      where: { id: imagem.id },
      update: imagem,
      create: imagem,
    });
    return ImageMapper.toDomain(createdImg);
  }
  async find(id: string): Promise<Image> {
    const image = await this.prisma.imagem.findUnique({
      where: { id },
    });
    return ImageMapper.toDomain(image);
  }
  async findAll(): Promise<Image[]> {
    const images = await this.prisma.imagem.findMany();
    return images.map(ImageMapper.toDomain);
  }
}

export { PrismaImageRepository };
