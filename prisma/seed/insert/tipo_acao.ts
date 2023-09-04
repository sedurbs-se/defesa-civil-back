import { PrismaClient } from '@prisma/client';
import tipoAcaoDataSeed from '../data/tipo_acao';
import { v4 } from 'uuid';

export default async (prisma: PrismaClient) => {
  return await prisma.tipoAcao.createMany({
    skipDuplicates: true,
    data: tipoAcaoDataSeed.map((t) => ({ id: v4(), nome: t.nome })),
  });
};
