const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  console.log('Modelos disponibles:', Object.keys(prisma).filter(k => !k.startsWith('_') && !k.startsWith('$')));
  await prisma.$disconnect();
}

check();
