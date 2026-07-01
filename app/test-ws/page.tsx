"use client";

export default function TestWsPage() {
  function connect() {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("✅ Connected");
    };

    ws.onmessage = (event) => {
      console.log(event.data);
    };

    ws.onclose = () => {
      console.log("❌ Closed");
    };
  }

  return (
    <button onClick={connect}>
      Connect WS
    </button>
  );
}