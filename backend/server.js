// Al inicio del server.js
import dotenv from "dotenv";
import express from "express";
import pg from "pg";
import cors from "cors";
import nodemailer from "nodemailer"; // 🆕 Agregar nodemailer

dotenv.config();

const { Pool } = pg;
const app = express();

app.use(cors());
app.use(express.json());

// Base de datos
const db = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// 🔧 Configurar nodemailer para Gmail (CORREGIDO)
const transporter = nodemailer.createTransport({
  // ✅ createTransport (sin 'r')
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // App Password, no tu contraseña normal
  },
});

// 🆕 Función para enviar email
const enviarEmail = async (destinatario, asunto, contenidoHTML) => {
  try {
    const mailOptions = {
      from: {
        name: process.env.COMPANY_NAME || "Sistema de Contacto",
        address: process.env.GMAIL_USER,
      },
      to: destinatario,
      subject: asunto,
      html: contenidoHTML,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email enviado:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error enviando email:", error);
    return { success: false, error: error.message };
  }
};

// 🆕 Template HTML para el email de respuesta
const crearTemplateRespuesta = (
  nombreUsuario,
  mensajeOriginal,
  respuesta,
  respondidoPor
) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .mensaje-original { background: #e9ecef; padding: 20px; border-left: 4px solid #6c757d; margin: 20px 0; border-radius: 5px; }
        .respuesta { background: white; padding: 20px; border-left: 4px solid #28a745; margin: 20px 0; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #dee2e6; color: #6c757d; font-size: 14px; }
        .btn { display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Respuesta a tu mensaje</h1>
          <p>Hemos respondido a tu consulta</p>
        </div>
        
        <div class="content">
          <p>Hola <strong>${nombreUsuario}</strong>,</p>
          
          <p>Gracias por contactarnos. Hemos revisado tu mensaje y queremos responderte:</p>
          
          <div class="mensaje-original">
            <h3>Tu mensaje original:</h3>
            <p><em>"${mensajeOriginal}"</em></p>
          </div>
          
          <div class="respuesta">
            <h3>Nuestra respuesta:</h3>
            <p>${respuesta}</p>
            <p><small>- ${respondidoPor}</small></p>
          </div>
          
          <p>Si tienes más preguntas, no dudes en contactarnos nuevamente.</p>
          
          <div class="footer">
            <p>Este email fue enviado desde nuestro sistema de gestión de contactos.</p>
            <p>${process.env.COMPANY_NAME || "Tu Empresa"}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// 🔧 Función helper para transacciones
const executeTransaction = async (queries) => {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const results = [];
    for (const { query, params } of queries) {
      const result = await client.query(query, params);
      results.push(result);
    }
    await client.query("COMMIT");
    return results;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

// ✅ Recibir formulario (tu endpoint existente)
app.post("/contact", async (req, res) => {
  const { nombre, email, mensaje } = req.body;
  try {
    await db.query(
      "INSERT INTO contactos (nombre, email, mensaje, estado) VALUES ($1, $2, $3, 'pendiente')",
      [nombre, email, mensaje]
    );
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.json({ ok: false });
  }
});

// ✅ Ver contactos con filtros (mejorado)
app.get("/contacts", async (req, res) => {
  try {
    const { estado = "all", page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    let query = `
      SELECT id, nombre, email, mensaje, estado, respuesta, 
             respondido_por, fecha_respuesta, created_at, updated_at
      FROM contactos 
    `;
    let params = [];

    if (estado !== "all") {
      query += ` WHERE estado = $1`;
      params.push(estado);
    }

    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${
      params.length + 2
    }`;
    params.push(limit, offset);

    const result = await db.query(query, params);

    // Contar total
    const countQuery =
      estado !== "all"
        ? "SELECT COUNT(*) FROM contactos WHERE estado = $1"
        : "SELECT COUNT(*) FROM contactos";
    const countParams = estado !== "all" ? [estado] : [];
    const countResult = await db.query(countQuery, countParams);

    res.json({
      mensajes: result.rows,
      total: parseInt(countResult.rows[0].count),
      page: parseInt(page),
      totalPages: Math.ceil(countResult.rows[0].count / limit),
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

// 🆕 Responder mensaje CON ENVÍO DE EMAIL
app.post("/contact/:id/respond", async (req, res) => {
  const { id } = req.params;
  const { respuesta, respondido_por = "Admin" } = req.body;

  try {
    // Obtener mensaje completo
    const currentMessage = await db.query(
      "SELECT * FROM contactos WHERE id = $1",
      [id]
    );

    if (currentMessage.rows.length === 0) {
      return res
        .status(404)
        .json({ ok: false, error: "Mensaje no encontrado" });
    }

    const mensaje = currentMessage.rows[0];
    const estadoAnterior = mensaje.estado;

    // Actualizar base de datos
    const queries = [
      {
        query: `UPDATE contactos 
                SET respuesta = $1, respondido_por = $2, fecha_respuesta = NOW(), 
                    estado = 'respondido', updated_at = NOW()
                WHERE id = $3`,
        params: [respuesta, respondido_por, id],
      },
      {
        query: `INSERT INTO contactos_historial (contacto_id, estado_anterior, estado_nuevo, usuario, comentario)
                VALUES ($1, $2, 'respondido', $3, $4)`,
        params: [
          id,
          estadoAnterior,
          respondido_por,
          `Respuesta enviada por email: ${respuesta.substring(0, 100)}...`,
        ],
      },
    ];

    await executeTransaction(queries);

    // 🆕 Enviar email al usuario
    const asunto = `Respuesta a tu mensaje - ${
      process.env.COMPANY_NAME || "Sistema de Contacto"
    }`;
    const contenidoHTML = crearTemplateRespuesta(
      mensaje.nombre,
      mensaje.mensaje,
      respuesta,
      respondido_por
    );

    const resultadoEmail = await enviarEmail(
      mensaje.email,
      asunto,
      contenidoHTML
    );

    if (resultadoEmail.success) {
      res.json({
        ok: true,
        message: "Respuesta enviada correctamente por email",
        emailSent: true,
        messageId: resultadoEmail.messageId,
      });
    } else {
      // Si falla el email, registrar en historial pero no fallar la operación
      await db.query(
        `INSERT INTO contactos_historial (contacto_id, estado_anterior, estado_nuevo, usuario, comentario)
         VALUES ($1, 'respondido', 'respondido', $2, $3)`,
        [id, respondido_por, `Error enviando email: ${resultadoEmail.error}`]
      );

      res.json({
        ok: true,
        message: "Respuesta guardada, pero hubo un error enviando el email",
        emailSent: false,
        emailError: resultadoEmail.error,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

// ✅ Cambiar estado (sin cambios)
app.put("/contact/:id", async (req, res) => {
  const { id } = req.params;
  const { estado, usuario = "Admin", comentario } = req.body;

  try {
    // Obtener estado actual
    const currentMessage = await db.query(
      "SELECT estado FROM contactos WHERE id = $1",
      [id]
    );
    if (currentMessage.rows.length === 0) {
      return res
        .status(404)
        .json({ ok: false, error: "Mensaje no encontrado" });
    }

    const estadoAnterior = currentMessage.rows[0].estado;

    const queries = [
      {
        query:
          "UPDATE contactos SET estado = $1, updated_at = NOW() WHERE id = $2",
        params: [estado, id],
      },
      {
        query: `INSERT INTO contactos_historial (contacto_id, estado_anterior, estado_nuevo, usuario, comentario)
                VALUES ($1, $2, $3, $4, $5)`,
        params: [
          id,
          estadoAnterior,
          estado,
          usuario,
          comentario || `Estado cambiado a ${estado}`,
        ],
      },
    ];

    await executeTransaction(queries);
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

// 🆕 Obtener historial de un mensaje
app.get("/contact/:id/history", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `
      SELECT * FROM contactos_historial 
      WHERE contacto_id = $1 
      ORDER BY fecha_cambio DESC
    `,
      [id]
    );

    res.json(result.rows);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// 🆕 Dashboard stats
app.get("/contacts/stats", async (req, res) => {
  try {
    const stats = await db.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE estado = 'pendiente') as pendientes,
        COUNT(*) FILTER (WHERE estado = 'en_proceso') as en_proceso,
        COUNT(*) FILTER (WHERE estado = 'respondido') as respondidos,
        COUNT(*) FILTER (WHERE estado = 'cerrado') as cerrados
      FROM contactos
    `);

    res.json(stats.rows[0]);
  } catch (error) {
    res.json({ error: error.message });
  }
});

// 🆕 Endpoint para probar configuración de email
app.post("/test-email", async (req, res) => {
  try {
    const resultado = await enviarEmail(
      process.env.ADMIN_EMAIL || process.env.GMAIL_USER,
      "Test de configuración de email",
      "<h1>¡Email configurado correctamente!</h1><p>El sistema de emails está funcionando.</p>"
    );
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
