"use client";

import ChatInput from "@/components/chat/ChatInput";
import ChatMessages from "@/components/chat/ChatMessages";
import dotenv from 'dotenv';
import { useEffect, useRef, useState } from "react";
dotenv.config();
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
  roomId: number;
  initialMessages: Message[];
};

export default function RoomClient({
  roomId,
  initialMessages,
}: Props) {
  const ws = useRef<WebSocket | null>(null);

  const [messages, setMessages] = useState(initialMessages);

  function sendMessage(content: string) {
    if (
      !ws.current ||
      ws.current.readyState !== WebSocket.OPEN
    ) {
      return;
    }

    ws.current.send(
      JSON.stringify({
        type: "SEND_MESSAGE",
        content,
      })
    );
  }

  useEffect(() => {
    const socket = new WebSocket(process.env.WS_URL || "");

    ws.current = socket;

    // socket.onopen = () => {
    //   socket.send(
    //     JSON.stringify({
    //       type: "JOIN_ROOM",
    //       roomId,
    //     })
    //   );
    // };
    socket.onopen = () => {
      console.log("WS Connected");
    };
    // socket.onopen = () => {
    //   console.log("WS Connected");

    //   setTimeout(() => {
    //     const payload = {
    //       type: "JOIN_ROOM",
    //       roomId,
    //     };

    //     console.log("Sending:", payload);

    //     socket.send(JSON.stringify(payload));
    //   }, 1000);
    // };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      console.log(data);

      switch (data.type) {
        case "CONNECTED":
          socket.send(
            JSON.stringify({
              type: "JOIN_ROOM",
              roomId,
            })
          );

          break;

        case "ROOM_JOINED":
          console.log(`Joined room ${data.roomId}`);
          break;

        case "NEW_MESSAGE":
          setMessages((prev) => [
            ...prev,
            data.message,
          ]);
          break;

        case "ERROR":
          console.error(data.message);
          break;
      }
    };

    socket.onclose = () => {
      console.log("Disconnected");
    };

    return () => {
      socket.close();
    };
  }, [roomId]);

  return (
    <div className="space-y-4">
      <ChatMessages
        messages={messages}
      />

      <ChatInput
        onSend={sendMessage}
      />
    </div>
  );
}