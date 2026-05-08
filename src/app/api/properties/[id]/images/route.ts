import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

// 1. POST: Recibe la URL de Cloudinary y la guarda en la BD de la propiedad
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // 🚀 CORRECCIÓN CLAVE: En Next.js 15, los params de API también son Promesas
    const resolvedParams = await params;

    const data = await request.json();
    const { url } = data;

    if (!url) {
      return NextResponse.json({ error: 'URL de imagen requerida' }, { status: 400 });
    }

    // Comprobamos si es la primera imagen para marcarla automáticamente como "Portada"
    const existingImages = await prisma.image.count({
      where: { propertyId: resolvedParams.id }
    });

    const isMain = existingImages === 0;

    const newImage = await prisma.image.create({
      data: {
        url,
        isMain,
        propertyId: resolvedParams.id,
      }
    });

    return NextResponse.json({ success: true, image: newImage });
  } catch (error) {
    console.error("Error al guardar imagen:", error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// 2. GET: Devuelve todas las imágenes de una propiedad para mostrarlas en la galería
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // 🚀 CORRECCIÓN CLAVE: En Next.js 15, los params de API también son Promesas
    const resolvedParams = await params;

    const images = await prisma.image.findMany({
      where: { propertyId: resolvedParams.id },
      orderBy: { isMain: 'desc' } // La portada sale primero
    });
    return NextResponse.json({ images });
  } catch (error) {
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
