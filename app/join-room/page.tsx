import JoinRoomForm from "@/components/room/JoinRoomForm";

export default function JoinRoomPage() {
  return (
    <main className="max-w-md mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-6">
        Join Room
      </h1>

      <JoinRoomForm  />
    </main>
  );
}