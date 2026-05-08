import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function GET() {
  try {
    // 1. Verificamos si ya existe el administrador maestro
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@inmobiliariabb.com' }
    });

    if (existingAdmin) {
      return NextResponse.json({ 
        message: 'El administrador ya existe. Ya puedes ir a /admin/login para entrar.' 
      });
    }

    // 2. Encriptamos la contraseña "123456" con seguridad militar (Bcrypt)
    const hashedPassword = await bcrypt.hash('123456', 10);

    // 3. Creamos el usuario maestro en la base de datos
    await prisma.user.create({
      data: {
        name: 'Administrador B&B',
        email: 'admin@inmobiliariabb.com',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: '¡Usuario administrador creado con éxito en la Base de Datos!',
      credenciales: {
        email: 'admin@inmobiliariabb.com',
        password: '123456'
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Ocurrió un error creando el administrador.' }, { status: 500 });
  }
}
