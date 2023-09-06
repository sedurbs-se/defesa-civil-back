import { Tarefa as PersistenceTarefa, Prisma } from '@prisma/client';
import { Tarefa } from '../domain/tarefa';
import { Evento } from '../domain/evento/evento';
import { TipoEvento } from '../domain/evento/tipoEvento';

const tarefaQueryWithEventos = Prisma.validator<Prisma.TarefaArgs>()({
  include: {
    eventos: {
      include: {
        tipoEvento: true,
      },
    },
  },
});

type TarefaWithEventos = Prisma.TarefaGetPayload<typeof tarefaQueryWithEventos>;
export class TarefaMapper {
  static toDomain(raw: PersistenceTarefa) {
    return new Tarefa({
      id: raw.id,
      acaoId: raw.acaoId,
      itemBasicoId: raw.itemBasicoId,
      nome: raw.nome,
      quantificavel: raw.quantificavel,
      status: raw.status,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }

  static toDomainWithEventos(raw: TarefaWithEventos) {
    return new Tarefa({
      id: raw.id,
      acaoId: raw.acaoId,
      itemBasicoId: raw.itemBasicoId,
      nome: raw.nome,
      quantificavel: raw.quantificavel,
      status: raw.status,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
      eventos: raw.eventos.map((evento) => {
        return new Evento({
          ...evento,
          tipoEvento: new TipoEvento(evento.tipoEvento),
        });
      }),
    });
  }

  static toPersistence(task: Tarefa): PersistenceTarefa {
    return {
      id: task.id,
      acaoId: task.acaoId,
      itemBasicoId: task.itemBasicoId,
      nome: task.nome,
      quantificavel: task.quantificavel,
      status: task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      deletedAt: task.deletedAt,
    };
  }
}
