import { PrismaClient } from "@prisma/client";
import municipio from "./insert/municipio";

const prisma = new PrismaClient();

async function main() {
  await municipio(prisma);
  
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
