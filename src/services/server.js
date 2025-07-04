const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Base de datos
const db = new Pool({
  host: "localhost",
  database: "ztrack",
  user: "postgres",
  password: "tu_password",
  port: 5432,
});

// Recibir formulario
app.post("/contact", async (req, res) => {
  const { nombre, email, mensaje } = req.body;

  try {
    await db.query(
      "INSERT INTO contactos (nombre, email, mensaje) VALUES ($1, $2, $3)",
      [nombre, email, mensaje]
    );
    res.json({ ok: true });
  } catch (error) {
    res.json({ ok: false });
  }
});

// Ver contactos
app.get("/contacts", async (req, res) => {
  const result = await db.query("SELECT * FROM contactos ORDER BY id DESC");
  res.json(result.rows);
});

// Cambiar estado
app.put("/contact/:id", async (req, res) => {
  const { estado } = req.body;
  await db.query("UPDATE contactos SET estado = $1 WHERE id = $2", [
    estado,
    req.params.id,
  ]);
  res.json({ ok: true });
});

app.listen(3000, () => console.log("Server running on port 3000"));
