type ChatMessagesProps = {
  messages: {
    id: number;
    content: string;
    createdAt: Date;
    sender: {
      id: string;
      name: string | null;
      email: string | null;
    };
  }[];
};

export default function ChatMessages({
  messages,
}: ChatMessagesProps) {
  if (messages.length === 0) {
    return (
      <div className="border rounded p-4 h-125">
        <p className="text-gray-500">
          No messages yet.
        </p>
      </div>
    );
  }

  return (
    <div className="border rounded p-4 h-125 overflow-y-auto space-y-3">
      {messages.map((message) => (
        <div
          key={message.id}
          className="border-b pb-2"
        >
          <p className="font-semibold">
            {message.sender.name ?? message.sender.email}
          </p>

          <p>{message.content}</p>
        </div>
      ))}
    </div>
  );
}