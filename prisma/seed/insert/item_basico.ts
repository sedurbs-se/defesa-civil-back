import { PrismaClient } from '@prisma/client';
import itemBasicoDataSeed from '../data/item_basico';
import { v4 } from 'uuid';

export default async (prisma: PrismaClient) => {
  return await prisma.itemBasico.createMany({
    skipDuplicates: true,
    data: itemBasicoDataSeed.map((t) => ({
      id: v4(),
      nome: t.nome,
    })),
  });
};
