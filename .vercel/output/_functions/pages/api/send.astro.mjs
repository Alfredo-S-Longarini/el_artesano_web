import { Resend } from 'resend';
export { renderers } from '../../renderers.mjs';

const resend = new Resend(undefined                              );
const json = (body, status) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json" }
});
const escapeHtml = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LIMITS = { name: 100, email: 200, subject: 100, message: 5e3 };
const RATE_WINDOW_MS = 10 * 60 * 1e3;
const RATE_MAX = 5;
const hits = /* @__PURE__ */ new Map();
const isRateLimited = (ip) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX;
};
const POST = async ({ request, clientAddress }) => {
  try {
    const body = await request.json();
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return json({ message: "Correo enviado con éxito" }, 200);
    }
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const subject = String(body.subject ?? "").trim() || "Consulta general";
    const message = String(body.message ?? "").trim();
    if (!name || !email || !message) {
      return json({ error: "Faltan campos obligatorios" }, 400);
    }
    if (!EMAIL_RE.test(email)) {
      return json({ error: "Email inválido" }, 400);
    }
    if (name.length > LIMITS.name || email.length > LIMITS.email || subject.length > LIMITS.subject || message.length > LIMITS.message) {
      return json({ error: "Algún campo supera el largo permitido" }, 400);
    }
    let ip = "unknown";
    try {
      ip = clientAddress;
    } catch {
    }
    if (isRateLimited(ip)) {
      return json({ error: "Demasiados envíos. Probá de nuevo en unos minutos." }, 429);
    }
    const ticketId = `REF-${crypto.randomUUID().split("-")[0].toUpperCase()}`;
    const finalSubject = `[${ticketId}] ${subject}`;
    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      subject: escapeHtml(subject),
      message: escapeHtml(message).replace(/\n/g, "<br />")
    };
    const { error } = await resend.emails.send({
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
            <p><strong>Nombre:</strong> ${safe.name}</p>
            <p><strong>Email:</strong> ${safe.email}</p>
            <p><strong>Interés:</strong> ${safe.subject}</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;" />
            <p><strong>Mensaje:</strong></p>
            <p style="background-color: #fff; padding: 15px; border: 1px solid #eee; border-radius: 4px;">
              ${safe.message}
            </p>
          </div>

          <div style="text-align: center; font-size: 12px; color: #999; margin-top: 30px;">
            Este correo fue enviado desde tu Portafolio Web.
          </div>
        </div>
      `
    });
    if (error) {
      console.error("Resend error:", error);
      return json({ error: "No se pudo enviar el mensaje" }, 500);
    }
    return json({ message: "Correo enviado con éxito", id: ticketId }, 200);
  } catch (e) {
    return json({ error: "Error interno del servidor" }, 500);
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
