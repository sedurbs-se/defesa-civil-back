import { Alteracao as PersistenceAlteracao, Prisma } from '@prisma/client';
import { Alteracao, TipoAlteracao } from '../domain/alteracao';
import { UsuarioMapper } from 'src/modules/disasters/mappers/UsuarioMapper';

const alteracaoWithUsuario = Prisma.validator<Prisma.AlteracaoArgs>()({
  include: {
    usuario: {
      include: {
        agente: true,
      },
    },
  },
});

type AlteracaoWithUsuario = Prisma.AlteracaoGetPayload<
  typeof alteracaoWithUsuario
>;

interface AlteracaoWithUsuarioAndDetails extends AlteracaoWithUsuario {
  antigo: Object|null;
  novo: Object;
}

export class AlteracaoMapper {
  static toDomain(raw: AlteracaoWithUsuario) {
    return new Alteracao({
      id: raw.id,
      id_usuario: raw.usuarioId,
      tabela: raw.tabela,
      tipo: TipoAlteracao[raw.tipo as TipoAlteracao],
      antigo_id: raw.antigo_id,
      novo_id: raw.novo_id,
      item_id: raw.item_id,
      createdAt: raw.createdAt,
      usuario: UsuarioMapper.toDomainWithDetails(raw.usuario),
    });
  }
  static toDomainWithDetails(raw: AlteracaoWithUsuarioAndDetails) {
    return new Alteracao({
      id: raw.id,
      id_usuario: raw.usuarioId,
      tabela: raw.tabela,
      tipo: TipoAlteracao[raw.tipo as TipoAlteracao],
      antigo_id: raw.antigo_id,
      novo_id: raw.novo_id,
      item_id: raw.item_id,
      createdAt: raw.createdAt,
      usuario: UsuarioMapper.toDomainWithDetails(raw.usuario),
      antigo: raw.antigo,
      novo: raw.novo,
    });
  }
  static toPersistence(alteracao: Alteracao) {
    return {
      id: alteracao.id,
      usuarioId: alteracao.id_usuario,
      tabela: alteracao.tabela,
      tipo: alteracao.tipo.toString(),
      antigo_id: alteracao.antigo_id,
      novo_id: alteracao.novo_id,
      item_id: alteracao.item_id,
      createdAt: alteracao.createdAt,
    };
  }
}
