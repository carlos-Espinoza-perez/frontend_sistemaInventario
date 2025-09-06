// utils/db.js
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // alternativa
  ssl: { rejectUnauthorized: false },
});


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { sql } = req.body;

  if (!sql) {
    return res.status(400).json({ error: "Missing SQL query" });
  }

  try {
    const result = await pool.query(sql);
    res.status(200).json({ rows: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}