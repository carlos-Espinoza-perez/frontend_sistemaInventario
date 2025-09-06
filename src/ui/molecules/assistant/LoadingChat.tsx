import { useEffect, useState } from "react";

const LoadingChat = () => {
  const [loadingText, setLoadingText] = useState("..."); // Procesando...

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev === "...") return ".";
        if (prev === ".") return "..";
        if (prev === "..") return "...";
        return ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
        <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
        </svg>
      </div>
      <div className="flex-1">
        <div className="bg-[var(--assistant-message-bg)] rounded-2xl rounded-tl-none p-3 max-w-xs">
          <p className="text-sm text-[var(--text-primary)] whitespace-pre-wrap">Procesando{loadingText}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingChat;