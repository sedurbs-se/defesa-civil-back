import { Acao as PersistenceAcao, Prisma } from '@prisma/client';
import { Acao } from '../domain/acao/acao';
import { TipoAcao } from '../domain/acao/TipoAcao';
import { UnidadeHabitacional } from 'src/modules/disasters/domain/unidadeHabitacional/unidade-habitacional';
import { AreaAfetada } from 'src/modules/disasters/domain/areaAfetada/area-afetada';

const acaoQueryWithTipo = Prisma.validator<Prisma.AcaoArgs>()({
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

type AcaoWithTipo = Prisma.AcaoGetPayload<typeof acaoQueryWithTipo>;

export class AcaoMapper {
  static toDomain(raw: PersistenceAcao) {
    return new Acao({
      id: raw.id,
      contexto: raw.contexto,
      unidadeHabitacionalId: raw.unidadeHabitacionalId,
      tipoId: raw.tipoAcaoId,
      areaAfetadaId: raw.areaAfetadaId,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }

  static toDomainWithDetails(raw: AcaoWithTipo) {
    return new Acao({
      id: raw.id,
      contexto: raw.contexto,
      unidadeHabitacionalId: raw.unidadeHabitacionalId,
      tipoId: raw.tipoAcaoId,
      areaAfetadaId: raw.areaAfetadaId,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
      tipo: new TipoAcao(raw.tipo),
      unidadeHabitacional: raw.unidadeHabitacional
        ? new UnidadeHabitacional({
            ...raw.unidadeHabitacional,
            ordem: raw.unidadeHabitacional.ORDEM,
            areaAfetada: new AreaAfetada({
              ...raw.unidadeHabitacional.areaAfetada,
              ordem: raw.unidadeHabitacional.areaAfetada.ORDEM,
            }),
          })
        : null,
      areaAfetada: raw.AreaAfetada
        ? new AreaAfetada({
            ...raw.AreaAfetada,
            ordem: raw.AreaAfetada.ORDEM,
          })
        : null,
    });
  }

  static toPersistence(action: Acao): PersistenceAcao {
    return {
      id: action.id,
      tipoAcaoId: action.tipoId,
      unidadeHabitacionalId: action.unidadeHabitacionalId,
      contexto: action.contexto,
      areaAfetadaId: action.areaAfetadaId,
      createdAt: action.createdAt,
      updatedAt: action.updatedAt,
      deletedAt: action.deletedAt,
    };
  }
}
