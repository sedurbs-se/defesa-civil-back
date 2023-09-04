import { Injectable } from '@nestjs/common';
import { Acao } from '../../domain/acao';
import { ActionMapper } from '../../mappers/AcaoMapper';
import { AcaoRepository, FindActionsOptions } from '../AcaoRepository';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PrismaAcaoRepository implements AcaoRepository {
  constructor(readonly prisma: PrismaService) {}
  async save(action: Acao): Promise<void> {
    const acao = ActionMapper.toPersistence(action);
    await this.prisma.acao.upsert({
      where: { id: acao.id },
      update: acao,
      create: acao,
    });
  }
  async find(id: string): Promise<Acao | null> {
    const acao = await this.prisma.acao.findUnique({
      where: { id },
    });
    if (!acao) return null;
    return ActionMapper.toDomain(acao);
  }
  async findAll(options: FindActionsOptions): Promise<Acao[]> {
    const acoes = await this.prisma.acao.findMany({
      where: options,
    });
    return acoes.map(ActionMapper.toDomain);
  }
}
