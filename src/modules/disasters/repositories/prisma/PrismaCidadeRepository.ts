import { PrismaService } from 'src/prisma.service';
import { Cidade } from '../../domain/cidade/cidade';
import { CidadeRepository } from '../CidadeRepository';
import { CidadeMapper } from '../../mappers/CidadeMapper';
import { Injectable } from '@nestjs/common';

@Injectable()
class PrismaCidadeRepository implements CidadeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(city: Cidade): Promise<void> {
    await this.prisma.municipio.create({
      data: {
        id: city.id,
        nome: city.nome,
      },
    });
  }

  async find(id: string): Promise<Cidade> {
    const cidade = await this.prisma.municipio.findUnique({
      where: {
        id,
      },
    });

    if (!cidade) return null;

    return CidadeMapper.toDomain(cidade);
  }

  async findAll(): Promise<Cidade[]> {
    const cidades = await this.prisma.municipio.findMany();

    return cidades.map(CidadeMapper.toDomain);
  }
}

export { PrismaCidadeRepository };
