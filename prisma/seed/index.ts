import { PrismaClient } from '@prisma/client';
import municipio from './insert/municipio';
import item_basico from './insert/item_basico';
import tipo_acao from './insert/tipo_acao';
import tipo_evento from './insert/tipo_evento';
import user_admin from './insert/user_admin';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn'],
});

async function main() {
  await Promise.all([
    municipio(prisma),
    item_basico(prisma),
    tipo_acao(prisma),
    tipo_evento(prisma),
    user_admin(prisma),
  ]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
