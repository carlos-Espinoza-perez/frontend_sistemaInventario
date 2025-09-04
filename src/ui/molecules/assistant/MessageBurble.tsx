import type { IChatMessage } from "../../../interface/IAssistantInterface";

const MessageBurble = ({ chat }: { chat: IChatMessage }) => {
  if (chat.isUser)
    return (
      <div className="flex items-start gap-3 justify-end">
        <div className="flex-1 flex flex-col items-end">
          <div className="bg-[var(--primary-color)] text-white rounded-2xl rounded-tr-none p-3 max-w-xs">
            <p className="text-sm whitespace-pre-wrap">{ chat.message }</p>
          </div>
        </div>
        <img alt="User Avatar" className="w-8 h-8 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMeUlQDGnK9Vox3GFy6rFuOLZ0KCb7bXFOh0dCvBiQf5RcHya7j7ifHLxGDMyBWZxqgAn8bxILb-yA0D6dlhS_LhxAAIxQwyRUJnWMWNTdsK36WF7sy1BaTldNlbxQhglStw5HmEz6LR3ut4_AFodjamWTr0K9MWBlDEkg7te-G0M4EmmSO98nM-L2tdJaHaxYHkmeAOhWy9c6plKPhBdXpRvWWcazyI-WYndbSsGSdq3QKYEnbyQtQrHssUKOd24u0ZO992iNSQA7" />
      </div>
    );

  else
    return (
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
          <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          </svg>
        </div>
        <div className="flex-1">
          <div className="bg-[var(--assistant-message-bg)] rounded-2xl rounded-tl-none p-3 max-w-xs">
            <p className="text-sm text-[var(--text-primary)] whitespace-pre-wrap">{ chat.message }</p>
          </div>
        </div>
      </div>
    );
};

export default MessageBurble;