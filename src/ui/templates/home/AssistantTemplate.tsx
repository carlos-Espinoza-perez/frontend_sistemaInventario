import ChatForm from "../../organisms/assistant/ChatForm";
import ListChats from "../../organisms/assistant/ListChats";
import HeaderActionBack from "../../organisms/header/HeaderActionBack";

const AssistantTemplate = () => {
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
