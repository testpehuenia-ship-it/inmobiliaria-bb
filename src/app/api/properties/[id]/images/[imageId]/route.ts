import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ id: string; imageId: string }> }
) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const params = await props.params;

  try {
    // Verificamos que la imagen exista y pertenezca a la propiedad
    const image = await prisma.image.findFirst({
      where: {
        id: params.imageId,
        propertyId: params.id,
      }
    });

    if (!image) {
      return NextResponse.json({ error: "Imagen no encontrada" }, { status: 404 });
    }

    // Eliminamos la imagen de nuestra base de datos local
    await prisma.image.delete({
      where: { id: params.imageId }
    });

    // Nota: Por ahora, solo la borramos de nuestra DB local.
    // Opcionalmente, aquí se podría usar la API de Cloudinary para destruirla en la nube
    // usando cloudinary.v2.uploader.destroy(public_id).

    return NextResponse.json({ message: "Imagen eliminada con éxito" });
  } catch (error) {
    console.error("Error eliminando imagen:", error);
    return NextResponse.json({ error: "Error al eliminar la imagen" }, { status: 500 });
  }
}
