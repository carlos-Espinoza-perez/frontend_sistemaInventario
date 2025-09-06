import { useEffect, useRef, useState } from "react";
import type { IChatMessage } from "../../../interface/IAssistantInterface";
import { setIsLoading, addNewChatMessage, setListChats } from "../../../features/AssistantSlice";
import { useAppDispatch } from "../../../hook/useAppDispatch";
import { useAppSelector } from "../../../hook/useAppSelector";
import useTalkAndListener from "../../../hook/useTalkAndListener";
import MessageBurble from "../../molecules/assistant/MessageBurble";
import { axiosPrivate } from "../../../services/AxiosInstance";
import LoadingChat from "../../molecules/assistant/LoadingChat";

const ListChats = () => {
  const dispatch = useAppDispatch();
  const listChats = useAppSelector(state => state.assistant.chatHistory);
  const isLoading = useAppSelector(state => state.assistant.isLoading);
  // const [loading, setLoading] = useState(false);
  // const hasInitialized = useRef(false);
  // const { talk } = useTalkAndListener();

  // const startChat = async () => {
  //   if (loading) return;

  //   setLoading(true);
  //   dispatch(setIsLoading(true));

  //   try {
  //     const { data: me } = await axiosPrivate.get("/auth/me");
  //     const messageInitial = `Eres un asistente virtual para un sistema de inventario tu puedes responder informacion sobre un sistema de invetario basico, Responde de manera coordinal un saludo. 
  //       Usuario: Hola buen dia te saluda ${me.username}`;
  //     const { data: assistantReply } = await axiosPrivate.get("/IA/chat", {
  //       params: { message: messageInitial }
  //     });

  //     dispatch(addNewChatMessage({
  //       message: assistantReply,
  //       isUser: false
  //     }));

  //     talk(assistantReply);
  //   } catch (error) {
  //     console.error("Error al iniciar chat:", error);
  //     // Opcional: mostrar toast o error en pantalla
  //   } finally {
  //     setLoading(false);
  //     dispatch(setIsLoading(false));
  //   }
  // };

  // useEffect(() => {
  //   if (!hasInitialized.current) {
  //     hasInitialized.current = true;

  //     if (listChats.length === 0) {
  //       startChat();
  //     }
  //   }

  //   return () => {
  //     dispatch(setListChats([]));
  //   };
  // }, []);

  return (
    <main className="space-y-6">
      {listChats.map((chat: IChatMessage, index: number) => (
        <MessageBurble key={index} chat={chat} />
      ))}
      
      {
        isLoading && (
          <LoadingChat />
        )
      }
    </main>
  );
};

export default ListChats;
