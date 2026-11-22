import type { Message } from "@/lib/types";

type Props = {
  message: Message;
  onRetry?: () => void;
};

export default function MessageBubble({ message, onRetry }: Props) {
  const isUser = message.role === "user";
  const base =
    "max-w-[85%] whitespace-pre-wrap px-4 py-3 text-[15px] leading-6 sm:max-w-[75%]";

  if (isUser) {
    return (
      <div className={`${base} self-end rounded-2xl rounded-br-sm bg-zinc-900 text-white`}>
        {message.content}
      </div>
    );
  }

  if (message.error) {
    return (
      <div className={`${base} self-start rounded-2xl rounded-bl-sm border border-red-300 bg-red-50 text-red-900`}>
        <div>{message.content}</div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-3 min-h-11 rounded-[10px] border border-red-700 bg-white px-4 text-sm font-semibold text-red-700 hover:bg-red-50"
          >
            Coba lagi
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`${base} self-start rounded-2xl rounded-bl-sm border border-zinc-200 bg-white`}>
      {message.content}
    </div>
  );
}