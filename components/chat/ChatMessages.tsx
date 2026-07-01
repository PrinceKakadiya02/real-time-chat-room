"use client";

type Message = {
  id: number;
  content: string;
  createdAt: Date;
  sender: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

type Props = {
  messages: Message[];
};

export default function ChatMessages({
  messages,
}: Props) {
  return (
    <div className="border rounded p-4 h-[500px] overflow-y-auto space-y-3">
      {messages.map((message) => (
        <div
          key={message.id}
          className="border rounded p-3"
        >
          <p className="font-semibold">
            {message.sender.name ?? "Unknown User"}
          </p>

          <p>{message.content}</p>

          <p className="text-xs text-gray-500">
            {new Date(message.createdAt).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            })}
          </p>
        </div>
      ))}
    </div>
  );
}