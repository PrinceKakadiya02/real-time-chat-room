"use client";

import { useState } from "react";
type ChatInputProps = {
  onSend: (content: string) => void;
};

export default function ChatInput({
  onSend,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    onSend(message);

    setMessage("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 mt-4"
    >
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border rounded p-2 flex-1"
      />

      <button
        type="submit"
        className="bg-black text-white px-4 rounded"
      >
        Send
      </button>
    </form>
  );
}