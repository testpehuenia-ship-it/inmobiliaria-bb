import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    // 1. Verificamos la sesión
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // 2. Buscamos el ID del agente usando su email para vincularlo a la propiedad
    const agent = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!agent) {
      return NextResponse.json({ error: 'Agente no encontrado' }, { status: 404 });
    }

    const data = await request.json();

    // 3. Guardamos la propiedad en la base de datos protegiendo datos vacíos
    const newProperty = await prisma.property.create({
      data: {
        title: data.title,
        description: data.description,
        price: parseFloat(data.price) || 0,
        currency: data.currency,
        operationType: data.operationType,
        propertyType: data.propertyType,
        status: 'DISPONIBLE',
        bedrooms: parseInt(data.bedrooms) || 0,
        bathrooms: parseInt(data.bathrooms) || 0,
        totalArea: parseFloat(data.totalArea) || 0,
        coveredArea: parseFloat(data.coveredArea) || 0,
        city: data.city,
        neighborhood: data.neighborhood || '',
        address: data.address || '',
        isFeatured: false,
        isNewArrival: data.isNewArrival === true || data.isNewArrival === 'true',
        agentId: agent.id, // Relacionamos la propiedad con el ID del creador
      }
    });

    return NextResponse.json({ success: true, property: newProperty });
  } catch (error) {
    console.error("ERROR CRÍTICO AL GUARDAR:", error);
    return NextResponse.json({ error: 'Error al crear la propiedad' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isNewArrival = searchParams.get('isNewArrival') === 'true';

  try {
    const properties = await prisma.property.findMany({
      where: isNewArrival ? { isNewArrival: true } : {},
      include: { images: true },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener propiedades' }, { status: 500 });
  }
}
