import express from "express";
import OpenAI from "openai";

const apiKEY = process.env.OPENAI_API_KEY; // 👈 No quemes la clave, usa variable de entorno
const assistantID = process.env.OPENAI_ASSISTANT_ID;

const router = express.Router();

// Inicializar OpenAI
const openai = new OpenAI({ apiKey: apiKEY });
const ASSISTANT_ID = assistantID;


class IA {
  userThreads = {};
  userId = null;
  threadId = null;
  message = null;
  mode = "assistant"; // assistant, normal
  stream = false; 
  req = null;
  res = null;

  constructor(userId, message, mode, stream, req, res) {
    this.userId = userId;
    this.message = message;
    this.mode = mode;
    this.stream = stream;
    this.req = req;
    this.res = res;
    
  }
  
  async init() {
    await this._getOrCreateThread();
    await this._addUserMessageToThread();
  }

  async _getOrCreateThread() {
    if (this.userThreads[this.userId]) this.threadId = this.userThreads[this.userId];

    const thread = await openai.beta.threads.create();
    const threadId = thread?.id;
    if (!threadId) throw new Error("Invalid thread.id");

    this.userThreads[this.userId] = threadId;
    this.threadId = threadId;
  }

  async _addUserMessageToThread() {
    await openai.beta.threads.messages.create(this.threadId, {
      role: "user",
      content: [{ type: "text", text: this.message }],
    });
  }


  async assistant_streamMode() {
    this.res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    this.res.setHeader("Cache-Control", "no-cache, no-transform");
    this.res.setHeader("Connection", "keep-alive");

    const runStream = openai.beta.threads.runs
      .createAndStream(this.threadId, { assistant_id: ASSISTANT_ID })
      .on("textDelta", (delta) => {
        this.res.write(`data: ${JSON.stringify({ text: delta.value })}\n\n`);
      });

    await runStream.finalRun();
    this.res.write(`event: done\ndata: {}\n\n`);
    this.res.end();
  }

  async assistant_jsonMode() { 
    const run = await openai.beta.threads.runs.create(this.threadId, {
      assistant_id: ASSISTANT_ID,
    });

    let completedRun;
    do {
      completedRun = await openai.beta.threads.runs.retrieve(run.id, {
        thread_id: this.threadId,
      });
    } while (
      completedRun.status !== "completed" &&
      completedRun.status !== "failed"
    );

    if (completedRun.status === "failed") {
      return this.res.status(500).json({ error: "Assistant execution failed" });
    }

    const messages = await openai.beta.threads.messages.list(this.threadId);
    const lastMessage = messages.data.find((msg) => msg.role === "assistant");

    this.res.json({
      response: lastMessage?.content[0]?.text?.value ?? "",
    });
  }

  async normal_streamMode() {
    this.res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    this.res.setHeader("Cache-Control", "no-cache, no-transform");
    this.res.setHeader("Connection", "keep-alive");

    try {
      const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: this.message }],
        stream: true, // 👈 importante
      });

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta?.content;
        if (delta) {
          this.res.write(`data: ${JSON.stringify({ text: delta })}\n\n`);
        }
      }

      this.res.write(`event: done\ndata: {}\n\n`);
      this.res.end();
    } catch (err) {
      console.error("Stream error:", err);
      this.res.status(500).json({ error: "Streaming failed" });
    }
  }


  async normal_jsonMode() { 
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: this.message }],
    });

    const text = completion.choices[0]?.message?.content ?? "";
    this.res.json({ response: text });
  }
}







// 🚀 Router
router.post("/chat-stream", async (req, res) => {
  const { userId, message, mode, stream = true } = req.body;
  if (!userId || !message) {
    return res.status(400).json({ error: "Missing userId or message" });
  }


  try {
    const classModel = new IA(userId, message, mode, stream, req, res);
    await classModel.init();

    if (stream) {
      if (mode === "assistant") 
        await classModel.assistant_streamMode();
      
      else 
        await classModel.normal_streamMode();
    }
    
    else {
      if (mode === "assistant")
        await classModel.assistant_jsonMode();
        
      else
        await classModel.normal_jsonMode();
    }
  } catch (err) {
    console.error("Error in /chat-stream:", err);
    if (stream) {
      res.write(`event: error\ndata: ${JSON.stringify({ error: err.message })}\n\n`);
      res.end();
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});


export default router;