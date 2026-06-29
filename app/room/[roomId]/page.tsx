import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getRoomById } from "@/lib/services/room.service";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatInput from "@/components/chat/ChatInput";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ roomId: number }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  const { roomId } = await params;
  const userId = session.user.id;

  const room = await getRoomById({
    userId: String(userId),
    roomId: Number(roomId),
  });

  if (!room) {
    redirect("/dashboard");
  }

  return (
  <main className="max-w-5xl mx-auto mt-10 p-4">
    <h1 className="text-3xl font-bold">
      {room.name}
    </h1>

    <p className="mt-2 text-gray-600">
      Members: {room.members.length} / {room.maxUsers}
    </p>

    <div className="mt-6">
      <ChatMessages messages={room.messages} />

      <ChatInput roomId={room.id} />
    </div>
  </main>
);
}