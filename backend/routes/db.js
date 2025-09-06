// routes/dbRouter.js
import express from "express";
import pkg from "pg";
const { Pool } = pkg;

const router = express.Router();

// Pool de PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Clase que maneja consultas SQL
class Database {
  req = null;
  res = null;
  sql = "";

  constructor(req, res) {
    this.req = req;
    this.res = res;
    this.sql = req.body?.sql || "";
  }

  validate() {
    if (this.req.method !== "POST") {
      this.res.status(405).json({ error: "Method not allowed" });
      return false;
    }

    if (!this.sql) {
      this.res.status(400).json({ error: "Missing SQL query" });
      return false;
    }

    return true;
  }

  async execute() {
    if (!this.validate()) return;

    try {
      const result = await pool.query(this.sql);
      this.res.status(200).json({ rows: result.rows });
    } catch (err) {
      console.error("SQL Error:", err);
      this.res.status(500).json({ error: err.message });
    }
  }
}

// 🚀 Router POST /sql
router.post("/sql", async (req, res) => {
  try {
    const db = new Database(req, res);
    await db.execute();
  } catch (err) {
    console.error("Unexpected error in /sql:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
