import express from "express";
import cors from "cors";
import chatRouter from "./routes/chat.js";
import dbRouter from "./routes/db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY);
app.use(cors());
app.use(express.json());
app.use("/api", chatRouter); // prefijo /api para el proxy
app.use("/api", dbRouter); // prefijo /api para el proxy

app.listen(5000, () => console.log("Backend corriendo en puerto 5000"));
