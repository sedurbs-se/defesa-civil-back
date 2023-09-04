import { Injectable } from '@nestjs/common';
import { Affected } from '../../domain/affected/affected';
import { AffectedRepository } from '../IAffectedRepository';
import { PrismaService } from 'src/prisma.service';
import { AffectedMapper } from '../../mappers/AffectedMapper';

@Injectable()
class PrismaAffectedRepository implements AffectedRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(affected: Affected): Promise<void> {
    const { ...data } = AffectedMapper.toPersistence(affected);

    await this.prisma.afetado.create({
      data,
    });
  }

  async update(affected: Affected): Promise<void> {
    const { ...data } = AffectedMapper.toPersistence(affected);

    await this.prisma.afetado.update({
      where: {
        id: affected.id,
      },
      data,
    });
  }
  
  async saveMany(affected: Affected[]): Promise<void> {
    const affecteds = affected.map((a) => AffectedMapper.toPersistence(a));

    await this.prisma.afetado.createMany({
      data: affecteds,
      skipDuplicates: true,
    });
  }

  async find(id: string): Promise<Affected> {
    const raw = await this.prisma.afetado.findUnique({
      where: {
        id,
      },
    });

    return AffectedMapper.toDomain(raw);
  }

  async findByCPF(cpf: string, unity_id: string): Promise<Affected> {
    const raw = await this.prisma.afetado.findFirst({
      where: {
        cpf,
        unidadeHabitacionalId: unity_id,
      },
    });

    return AffectedMapper.toDomain(raw);
  }

  async findAll(unityId: string): Promise<Affected[]> {
    const raw = await this.prisma.afetado.findMany({
      where: {
        unidadeHabitacionalId: unityId,
      },
    });

    return raw.map((r) => AffectedMapper.toDomain(r));
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

export { PrismaAffectedRepository };
