import { PrismaService } from 'src/prisma.service';
import { FotosRepository } from '../FotosRepository';
import { Injectable } from '@nestjs/common';
import { Fotos } from '../../domain/fotos/fotos';
import { FotosMapper } from '../../mappers/FotoMapper';

@Injectable()
export class PrismaFotoRepository implements FotosRepository {
  constructor(private prisma: PrismaService) {}

  async save(photos: Fotos[]): Promise<void> {
    // const p = FotosMapper.toPersistence(photo);

    // await this.prisma.fotoUnidade.create({
    //   data: p,
    // });
    await this.prisma.fotoUnidade.createMany({
      data: photos.map((p) => FotosMapper.toPersistence(p)),
    });
  }

  async find(id: string): Promise<Fotos> {
    const photo = await this.prisma.fotoUnidade.findUnique({
      where: {
        id,
      },
    });
    if (!photo) {
      return null;
    }

    return FotosMapper.toDomain(photo);
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
