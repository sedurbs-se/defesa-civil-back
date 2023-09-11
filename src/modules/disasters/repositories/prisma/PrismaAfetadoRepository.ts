import { Injectable } from '@nestjs/common';
import { Afetado } from '../../domain/afetado/afetado';
import { AfetadoRepository } from '../AfetadoRepository';
import { PrismaService } from 'src/prisma.service';
import { AfetadoMapper } from '../../mappers/AfetadoMapper';

@Injectable()
class PrismaAfetadoRepository implements AfetadoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(affected: Afetado): Promise<Afetado> {
    const { ...data } = AfetadoMapper.toPersistence(affected);

    const a = await this.prisma.afetado.create({
      data,
    });

    return AfetadoMapper.toDomain(a);
  }

  async update(affected: Afetado): Promise<Afetado> {
    const { ...data } = AfetadoMapper.toPersistence(affected);

    const a = await this.prisma.afetado.update({
      where: {
        id: affected.id,
      },
      data,
    });
    return AfetadoMapper.toDomain(a);
  }

  async saveMany(affected: Afetado[]): Promise<void> {
    const affecteds = affected.map((a) => AfetadoMapper.toPersistence(a));

    await this.prisma.afetado.createMany({
      data: affecteds,
      skipDuplicates: true,
    });
  }

  async find(id: string): Promise<Afetado> {
    const raw = await this.prisma.afetado.findUnique({
      where: {
        id,
      },
    });
    if (!raw) return null;
    return AfetadoMapper.toDomain(raw);
  }

  async findByCPF(cpf: string, unity_id: string): Promise<Afetado> {
    const raw = await this.prisma.afetado.findFirst({
      where: {
        cpf,
        unidadeHabitacionalId: unity_id,
      },
    });

    if (!raw) return null;
    return AfetadoMapper.toDomain(raw);
  }

  async findAll(unityId: string): Promise<Afetado[]> {
    const raw = await this.prisma.afetado.findMany({
      where: {
        unidadeHabitacionalId: unityId,
      },
    });

    return raw.map((r) => AfetadoMapper.toDomain(r));
  }
  async delete(id: string[]): Promise<void> {
    await this.prisma.afetado.deleteMany({
      where: {
        id: {
          in: id,
        },
      },
    });
  }
}

export { PrismaAfetadoRepository };
