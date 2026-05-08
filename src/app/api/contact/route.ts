import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, mensaje, propertyId, propertyTitle, type, propertyType, bedrooms, bathrooms, area, address } = body;

    // Guardar en la base de datos
    const inquiry = await prisma.inquiry.create({
      data: {
        nombre,
        email,
        telefono,
        mensaje: mensaje || "",
        propertyId: propertyId || null,
        propertyTitle: propertyTitle || null,
        type: type || "CONSULTA",
        propertyType: propertyType || null,
        bedrooms: bedrooms ? parseInt(bedrooms) : null,
        bathrooms: bathrooms ? parseInt(bathrooms) : null,
        area: area ? parseFloat(area) : null,
        address: address || null,
      }
    });

    // Configurar el transportador de correo (Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Armar el cuerpo del mail según el tipo
    let subject = `Nueva consulta de ${nombre}`;
    let htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2b6e4f;">Notificación de Inmobiliaria B&B</h2>
        <p><strong>Tipo de solicitud:</strong> ${type || "Consulta General"}</p>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
    `;

    if (type === 'TASACION') {
      subject = `🏠 SOLICITUD DE TASACIÓN: ${nombre}`;
      htmlContent += `
        <div style="background: #f8faf9; padding: 15px; border-radius: 8px; border: 1px solid #e0e0e0; margin-top: 20px;">
          <h3 style="color: #2b6e4f; margin-top: 0;">Datos de la Propiedad a Tasar:</h3>
          <p><strong>Tipo:</strong> ${propertyType}</p>
          <p><strong>Ambientes:</strong> ${bedrooms} dorm / ${bathrooms} baños</p>
          <p><strong>Superficie:</strong> ${area} m2</p>
          <p><strong>Dirección:</strong> ${address}</p>
          <p><strong>Descripción:</strong> ${mensaje}</p>
        </div>
      `;
    } else if (propertyTitle) {
      subject = `Interés en Propiedad: ${propertyTitle}`;
      htmlContent += `
        <p><strong>Propiedad de interés:</strong> ${propertyTitle} (ID: ${propertyId})</p>
        <p><strong>Mensaje:</strong></p>
        <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">${mensaje}</p>
      `;
    } else {
      htmlContent += `
        <p><strong>Mensaje:</strong></p>
        <p style="background: #f9f9f9; padding: 10px; border-radius: 5px;">${mensaje}</p>
      `;
    }

    htmlContent += `
        <p style="margin-top: 30px; font-size: 0.8rem; color: #888;">Este es un mensaje automático enviado desde el sistema de Inmobiliaria B&B.</p>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Se envía al dueño
      subject: subject,
      html: htmlContent,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, inquiry });
  } catch (error: any) {
    console.error('Error al procesar consulta:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Hubo un problema al procesar tu solicitud' },
      { status: 500 }
    );
  }
}
