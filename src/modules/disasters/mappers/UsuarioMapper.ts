import { Usuario as PersistenceUser, Prisma } from '@prisma/client';
import { CARGOS, Usuario } from '../domain/usuario/usuario';
import { Agente } from '../domain/agente/agente';

const userWithAgent = Prisma.validator<Prisma.UsuarioArgs>()({
  include: { agente: true },
});

type UserWithAgent = Prisma.UsuarioGetPayload<typeof userWithAgent>;

export class UsuarioMapper {
  static toDomain(raw: PersistenceUser) {
    return new Usuario({
      id: raw.id,
      nome: raw.nome,
      cpf: raw.cpf,
      cargo: raw.cargo as CARGOS,
    });
  }

  static toDomainWithDetails(raw: UserWithAgent) {
    return new Usuario({
      id: raw.id,
      nome: raw.nome,
      cpf: raw.cpf,
      cargo: raw.cargo as CARGOS,
      agente: new Agente({
        id: raw.agente.id,
        funcao: raw.agente.funcao,
        contato: raw.agente.contato,
        usuarioId: raw.agente.usuarioId,
      }),
    });
  }

  static toPersistence(user: Usuario) {
    return {
      id: user.id,
      nome: user.nome,
      cpf: user.cpf,
      cargo: user.cargo,
    };
  }
}
