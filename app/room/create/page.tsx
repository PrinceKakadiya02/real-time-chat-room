import CreateRoomForm from '@/components/room/CreateRoomForm';

export default function CreateRoomPage() {
  return (
    <main className="max-w-lg mx-auto mt-20">
      <h1 className="text-3xl font-bold mb-8">
        Create Room
      </h1>

      <CreateRoomForm />
    </main>
  );
}