import { addNewChatMessage, setIsLoading } from "../../../features/AssistantSlice";
import { useAppDispatch } from "../../../hook/useAppDispatch";
import { useAppSelector } from "../../../hook/useAppSelector";
import { axiosPrivate } from "../../../services/AxiosInstance";
import useTalkAndListener from "../../../hook/useTalkAndListener";

const ChatForm = () => {
  const dispatch = useAppDispatch();
  const isLoadingChat = useAppSelector(a => a.assistant.isLoading);
  const { talk } = useTalkAndListener();

  const handleSendMessage = async () => { 
    const inputElement = document.querySelector('input[type="text"]') as HTMLInputElement;
    const message = inputElement.value;
    inputElement.value = '';

    if (message.trim() === '') return;

    // Logic to send the message goes here
    dispatch(setIsLoading(true));
    dispatch(addNewChatMessage({
      message,
      isUser: true
    }));

    const response = await axiosPrivate.get("/IA/chatQuery?message=" + encodeURIComponent(message));
    dispatch(addNewChatMessage({
      message: response.data,
      isUser: false
    }));

    talk(response.data);
    dispatch(setIsLoading(false));
  };

  return (
    <footer className="sticky bottom-0 bg-[var(--background-color)] p-2 border-t">
      <div className="flex items-center gap-2">
        <input
          disabled={isLoadingChat}
          className="flex-1 w-full px-4 py-2 text-sm text-[var(--text-primary)] bg-[var(--input-background)] border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition-shadow" placeholder="Type a message..." type="text" />
        <button
          className="p-2 text-[var(--text-secondary)] hover:text-[var(--primary-color)]"
          disabled={isLoadingChat}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          </svg>
        </button>
        <button
          onClick={handleSendMessage}
          className="p-2 rounded-full bg-[var(--primary-color)] text-white disabled:bg-gray-400" disabled={isLoadingChat}>
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          </svg>
        </button>
      </div>
    </footer>
  );
};  

export default ChatForm;