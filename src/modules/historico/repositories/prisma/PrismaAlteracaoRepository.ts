import { PrismaService } from 'src/prisma.service';
import { AlteracaoRepository } from '../AlteracaoRepository';
import { Alteracao } from '../../domain/alteracao';
import { BuscarTodosFiltrosDTO } from '../../dtos/BuscarTodosFiltrosDTO';
import { Injectable } from '@nestjs/common';
import { AlteracaoMapper } from '../../mappers/AlteracaoMapper';

@Injectable()
class PrismaAlteracaoRepository implements AlteracaoRepository {
  constructor(private readonly prisma: PrismaService) {}
  async find(id: string): Promise<Alteracao> {
    const a = await this.prisma.alteracao.findUnique({
      where: {
        id,
      },
      include: {
        usuario: true,
      },
    });
    if (!a) return null;
    return AlteracaoMapper.toDomain(a);
  }
  async findAll({
    id_usuario,
    tipo,
    pagina,
    limite,
  }: BuscarTodosFiltrosDTO): Promise<Alteracao[]> {
    const alteracoes = await this.prisma.alteracao.findMany({
      where: {
        usuarioId: id_usuario,
        tipo,
      },
      include: {
        usuario: true,
      },
      skip: pagina * limite,
      take: limite,
    });

    return alteracoes.map((a) => AlteracaoMapper.toDomain(a));
  }
  async save(alteracao: Alteracao): Promise<void> {
    const data = AlteracaoMapper.toPersistence(alteracao);
    await this.prisma.alteracao.create({
      data: {
        usuarioId: data.usuarioId,
        id: data.id,
        tipo: data.tipo,
        antigo_id: data.antigo_id,
        novo_id: data.novo_id,
        createdAt: data.createdAt,
      },
    });
  }
}

export { PrismaAlteracaoRepository };
