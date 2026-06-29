"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function JoinRoomForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/room/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? "Failed to join room.");
        return;
      }

      router.push(`/room/${data.roomId}`);
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-md"
    >
      <input
        type="text"
        placeholder="Room Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded-md p-2"
        required
      />

      <input
        type="password"
        placeholder="Room Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded-md p-2"
        required
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white rounded-md p-2 disabled:opacity-50"
      >
        {loading ? "Joining..." : "Join Room"}
      </button>
    </form>
  );
}