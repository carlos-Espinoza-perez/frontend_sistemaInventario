import { useEffect, useRef, useState } from "react";
import ChatForm from "../../organisms/assistant/ChatForm";
import ListChats from "../../organisms/assistant/ListChats";
import HeaderActionBack from "../../organisms/header/HeaderActionBack";
import axios from "axios";
import moment from "moment";
import { axiosApiInternal } from "../../../services/AxiosInstance";

const AssistantTemplate = () => {
  const [loadingStart, setLoadingStart] = useState(false);
  const hasRunRef = useRef(false);

  const startChat = async () => {
    if (loadingStart) return;

    const fullName = JSON.parse(localStorage.getItem("user") || '""').fullname || "Usuario";
    const userId = JSON.parse(localStorage.getItem("user") || '""').username || moment().format("YYYY-MM-DD");

    const message = `Eres mi ayudante de sistema de inventario. Te saluda ${fullName}`;
    
    const response = await axiosApiInternal().post("/api/chat-stream",
      { userId, message, mode: "normal", stream: true },
      { responseType: "stream"  }
    );

    let result = "";

    response.data.on("data", (chunk: Buffer) => {
      const text = chunk.toString("utf-8");
      result += text;
      console.log("Chunk recibido:", text); // 👈 aquí recibes pedazos de texto
    });

    response.data.on("end", () => {
      console.log("Texto final:", result);
    });

    response.data.on("error", (err: Error) => {
      console.error("Error en stream:", err);
    });
  };



  useEffect(() => {
    if (!hasRunRef.current) {
      hasRunRef.current = true;
      startChat();
      setLoadingStart(true);
    }
  }, []);


  return (
    <>
      <style>
        :root {"{"}
        --user-message-bg: #E5E7EB;--assistant-message-bg: #F3F4F6;--text-primary: #1F2937;--text-secondary: #6B7280;--background-color: #FFFFFF;
        --input-background: #F9FAFB;
        {"}"}
      </style>

      <HeaderActionBack title="Asistente de inventario" />
      <main className="p-4 min-h-[calc(100dvh-129px)]">
        <ListChats />
      </main>
      <ChatForm />
    </>
  );
};

export default AssistantTemplate;
