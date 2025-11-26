import type { APIRoute } from "astro";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Faltan campos obligatorios" }),
        { status: 400 }
      );
    }

    // 1. Generamos un ID Único corto
    // Tomamos los primeros 8 caracteres de un UUID y lo ponemos en mayúsculas
    const ticketId = `REF-${crypto.randomUUID().split("-")[0].toUpperCase()}`;

    // 2. Modificamos el asunto para incluir el ID
    // Ejemplo: "[REF-4A2B1C] Presupuesto Web"
    const finalSubject = `[${ticketId}] ${subject}`;

    const { data, error } = await resend.emails.send({
      from: "Artesano Web <noreply@elartesanoweb.com>",
      to: ["elartesanoweb73@gmail.com"],
      subject: `¡Nueva consulta web de ${name}! (${finalSubject})`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <div style="background-color: #f4f4f4; padding: 20px; border-radius: 8px;">
            <h2 style="color: #5c4033; margin-top: 0;">Nuevo Mensaje de Contacto</h2>
            <p style="font-size: 14px; color: #666;">ID de Referencia: <strong>${ticketId}</strong></p>
          </div>
          
          <div style="padding: 20px;">
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Interés:</strong> ${subject}</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Mensaje:</strong></p>
            <p style="background-color: #fff; padding: 15px; border: 1px solid #eee; border-radius: 4px;">
              ${message}
            </p>
          </div>

          <div style="text-align: center; font-size: 12px; color: #999; margin-top: 30px;">
            Este correo fue enviado desde tu Portafolio Web.
          </div>
        </div>
      `,
    });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    // Devolvemos el ID al frontend por si quieres mostrarlo al usuario (opcional)
    return new Response(
      JSON.stringify({
        message: "Correo enviado con éxito",
        id: ticketId,
      }),
      { status: 200 }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500 }
    );
  }
};
