const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const props = await prisma.property.findMany({
    select: { operationType: true, title: true, status: true }
  });
  console.log('Propiedades en DB:', JSON.stringify(props, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
