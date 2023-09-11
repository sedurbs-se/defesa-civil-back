import { Alteracao as PersistenceAlteracao, Prisma } from '@prisma/client';
import { Alteracao, TipoAlteracao } from '../domain/alteracao';
import { UsuarioMapper } from 'src/modules/disasters/mappers/UsuarioMapper';

const alteracaoWithUsuario = Prisma.validator<Prisma.AlteracaoArgs>()({
  include: { usuario: true },
});

type AlteracaoWithUsuario = Prisma.AlteracaoGetPayload<
  typeof alteracaoWithUsuario
>;

export class AlteracaoMapper {
  static toDomain(raw: AlteracaoWithUsuario) {
    return new Alteracao({
      id: raw.id,
      id_usuario: raw.usuarioId,
      tipo: TipoAlteracao[raw.tipo as TipoAlteracao],
      antigo_id: raw.antigo_id,
      novo_id: raw.novo_id,
      createdAt: raw.createdAt,
      usuario: UsuarioMapper.toDomain(raw.usuario),
    });
  }

  static toPersistence(alteracao: Alteracao) {
    return {
      id: alteracao.id,
      usuarioId: alteracao.id_usuario,
      tipo: alteracao.tipo.toString(),
      antigo_id: alteracao.antigo_id,
      novo_id: alteracao.novo_id,
      createdAt: alteracao.createdAt,
    };
  }
}
