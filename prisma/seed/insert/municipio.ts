import { PrismaClient } from '@prisma/client';
import municipioDataSeed from '../data/municipio';
import { v4 } from 'uuid';

export default async (prisma: PrismaClient) => {
  return await prisma.municipio.createMany({
    skipDuplicates: true,
    data: municipioDataSeed.map((m) => ({ id: v4(), nome: m.nome })),
  });
};
