import { PrismaService } from 'src/prisma.service';
import { City } from '../../domain/city/city';
import { CityRepository } from '../ICityRepository';
import { CityMapper } from '../../mappers/CityMapper';
import { Injectable } from '@nestjs/common';

@Injectable()
class PrismaCityRepository implements CityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(city: City): Promise<void> {
    await this.prisma.municipio.create({
      data: {
        id: city.id,
        nome: city.name,
    },
    });
  }

  async find(id: string): Promise<City> {
    const cidade = await this.prisma.municipio.findUnique({
      where: {
        id,
      },
    });

    if(!cidade) return null;

    return CityMapper.toDomain(cidade);
  }

  async findAll(): Promise<City[]> {
    const cidades = await this.prisma.municipio.findMany();

    return cidades.map(CityMapper.toDomain);
  }
}

export { PrismaCityRepository };
