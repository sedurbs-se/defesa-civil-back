import { Injectable } from '@nestjs/common';
import { Action } from '../../domain/action';
import { ActionMapper } from '../../mappers/ActionMapper';
import { AcaoRepository } from '../IAcaoRepository';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PrismaAcaoRepository implements AcaoRepository {
  constructor(readonly prisma: PrismaService) {}
  async save(action: Action): Promise<void> {
    const acao = ActionMapper.toPersistence(action);
    await this.prisma.acao.upsert({
      where: { id: acao.id },
      update: acao,
      create: acao,
    });
  }
  async find(id: string): Promise<Action | null> {
    const acao = await this.prisma.acao.findUnique({
      where: { id },
    });
    if (!acao) return null;
    return ActionMapper.toDomain(acao);
  }
  async findAll(): Promise<Action[]> {
    const acoes = await this.prisma.acao.findMany();
    return acoes.map(ActionMapper.toDomain);
  }
}
