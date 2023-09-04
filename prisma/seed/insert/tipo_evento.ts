import { PrismaClient } from '@prisma/client';
import tipoEventoDataSeed from '../data/tipo_evento';
import { v4 } from 'uuid';

export default async (prisma: PrismaClient) => {
  return await prisma.tipoEvento.createMany({
    skipDuplicates: true,
    data: tipoEventoDataSeed.map((t) => ({
      id: v4(),
      nome: t.nome,
      final: t.final,
    })),
  });
};
