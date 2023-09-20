import { PrismaService } from 'src/prisma.service';
import { AlteracaoRepository } from '../AlteracaoRepository';
import {
  Alteracao,
  AlteracaoTable,
  buildQuery,
  buildQueryIds,
} from '../../domain/alteracao';
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
        usuario: {
          include: {
            agente: true,
          },
        },
      },
    });

    if (!a) return null;

    const selectedTable = AlteracaoTable[a.tabela];

    if (!selectedTable) return null;

    const novo = await this.prisma.$queryRawUnsafe(
      buildQuery(selectedTable, a.novo_id),
    );

    const antigo = await this.prisma.$queryRawUnsafe(
      buildQuery(selectedTable, a.antigo_id),
    );

    return AlteracaoMapper.toDomainWithDetails({
      ...a,
      antigo: antigo?.[0] || null,
      novo: novo?.[0] || null,
    });
  }
  async findAll({
    pagina,
    limite,
    item_id,
    tabela,
    ...filtros
  }: BuscarTodosFiltrosDTO): Promise<Alteracao[]> {

    const selectedTable = AlteracaoTable[tabela];

    if (!selectedTable) return null;

    const allData: { [key: string]: string | null }[] =
      await this.prisma.$queryRawUnsafe(buildQueryIds(selectedTable, item_id));

    const ids = [];

    for (const data of allData) {
      for (const key of Object.keys(data)) {
        const value = data[key];
        if (value && !ids.includes(value)) {
          ids.push(value);
        }
      }
    }

    console.log(ids);

    const alteracoes = await this.prisma.alteracao.findMany({
      where: {
        item_id: {
          in: ids,
        }
      },
      include: {
        usuario: {
          include: {
            agente: true,
          },
        },
      },
      skip: pagina * limite,
      take: limite,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return alteracoes.map((a) => AlteracaoMapper.toDomain(a));
  }
  async save(alteracao: Alteracao): Promise<void> {
    const data = AlteracaoMapper.toPersistence(alteracao);

    // pega ultima alteracao e atualiza o novo_id para o "novo" antigo_id

    const ultimaAlteracao = await this.prisma.alteracao.findFirst({
      where: {
        tabela: data.tabela,
        novo_id: data.novo_id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log(alteracao, ultimaAlteracao);
    if (ultimaAlteracao) {
      await this.prisma.alteracao.update({
        where: {
          id: ultimaAlteracao.id,
        },
        data: {
          novo_id: data.antigo_id,
        },
      });
    }

    await this.prisma.alteracao.create({
      data: {
        usuarioId: data.usuarioId,
        id: data.id,
        tipo: data.tipo,
        tabela: data.tabela,
        antigo_id: data.antigo_id,
        novo_id: data.novo_id,
        item_id: data.item_id,
        createdAt: data.createdAt,
      },
    });
  }
}

export { PrismaAlteracaoRepository };
