import { PrismaClient } from '@prisma/client';
import { user_admin, user_agent } from '../data/user_admin';
import { v4 } from 'uuid';

export default async (prisma: PrismaClient) => {
  const user = await prisma.usuario.create({
    data: { id: v4(), ...user_admin },
  });

  await prisma.agente.create({
    data: {
      id: v4(),
      contato: user_agent.contato,
      funcao: user_agent.funcao,
      usuarioId: user.id,
    },
  });
};
