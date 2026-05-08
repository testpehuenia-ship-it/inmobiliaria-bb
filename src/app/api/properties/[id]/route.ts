import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

// Obtener datos de una propiedad específica
export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const property = await prisma.property.findUnique({
      where: { id: params.id }
    });
    
    if (!property) {
      return NextResponse.json({ error: "Propiedad no encontrada" }, { status: 404 });
    }
    
    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

// Editar propiedad
export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const params = await props.params;

  try {
    const data = await request.json();
    
    // Parseamos campos numéricos de forma segura
    const propertyData = {
      ...data,
      price: parseFloat(data.price),
      bedrooms: parseInt(data.bedrooms),
      bathrooms: parseInt(data.bathrooms),
      totalArea: parseFloat(data.totalArea),
      coveredArea: parseFloat(data.coveredArea),
    };

    const updatedProperty = await prisma.property.update({
      where: { id: params.id },
      data: propertyData
    });

    return NextResponse.json(updatedProperty);
  } catch (error) {
    console.error("Error actualizando propiedad:", error);
    return NextResponse.json({ error: "Error al actualizar la propiedad" }, { status: 500 });
  }
}

// Eliminar propiedad
export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const params = await props.params;

  try {
    // Esto también borrará las imágenes asociadas en Prisma gracias al onDelete: Cascade
    await prisma.property.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: "Propiedad eliminada correctamente" });
  } catch (error) {
    console.error("Error eliminando propiedad:", error);
    return NextResponse.json({ error: "Error al eliminar la propiedad" }, { status: 500 });
  }
}
