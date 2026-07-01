import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { getRoomById } from "@/lib/services/room.service";
import RoomClient from "./RoomClient";

type RoomPageProps = {
  params: Promise<{
    roomId: string;
  }>;
};

export default async function RoomPage({
  params,
}: RoomPageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  const { roomId } = await params;

  const room = await getRoomById({
    roomId: Number(roomId),
    userId: String(session.user.id),
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
        <RoomClient
          roomId={room.id}
          initialMessages={room.messages}
        />
      </div>
    </main>
  );
}