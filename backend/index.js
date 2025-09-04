import express from "express";
import cors from "cors";
import chatRouter from "./routes/chat.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", chatRouter); // prefijo /api para el proxy

app.listen(5000, () => console.log("Backend corriendo en puerto 5000"));
