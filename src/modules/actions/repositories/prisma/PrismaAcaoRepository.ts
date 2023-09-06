import { Injectable } from '@nestjs/common';
import { Acao } from '../../domain/acao/acao';
import { AcaoMapper } from '../../mappers/AcaoMapper';
import { AcaoRepository, FindActionsOptions } from '../AcaoRepository';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PrismaAcaoRepository implements AcaoRepository {
  constructor(readonly prisma: PrismaService) {}
  async save(action: Acao): Promise<void> {
    const acao = AcaoMapper.toPersistence(action);
    await this.prisma.acao.upsert({
      where: { id: acao.id },
      update: acao,
      create: acao,
    });
  }
  async find(id: string): Promise<Acao | null> {
    const acao = await this.prisma.acao.findUnique({
      where: { id },
      include: {
        tipo: true,
        unidadeHabitacional: {
          include: {
            areaAfetada: true,
          },
        },
        AreaAfetada: true,
      },
    });
    if (!acao) return null;
    return AcaoMapper.toDomainWithDetails(acao);
  }
  async findAll(options: FindActionsOptions): Promise<Acao[]> {
    const acoes = await this.prisma.acao.findMany({
      where: options,
    });
    return acoes.map(AcaoMapper.toDomain);
  }
}
