import { AuthenticateSocket } from "./types.js";

class RoomManager {
  private rooms = new Map<number, Set<AuthenticateSocket>>();

  joinRoom(socket: AuthenticateSocket, roomId: number) {
    this.leaveRoom(socket);

    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new Set());
    }

    this.rooms.get(roomId)!.add(socket);

    socket.roomId = roomId;

    console.log(`Socket joined room ${roomId}`);
    console.log(this.rooms);
    console.log("Clients in room:", this.rooms.get(roomId)?.size);
  }

  leaveRoom(socket: AuthenticateSocket) {
    if (socket.roomId === undefined) return;

    const room = this.rooms.get(socket.roomId);

    if (!room) {
      delete socket.roomId;
      return;
    }

    room.delete(socket);

    if (room.size === 0) {
      this.rooms.delete(socket.roomId);
    }

    delete socket.roomId;
  }

  // broadcast(roomId: number, payload: unknown) {
  //   const room = this.rooms.get(roomId);

  //   if (!room) return;

  //   const message = JSON.stringify(payload);

  //   for (const socket of room) {
  //     socket.send(message);
  //   }
  // }
  broadcast(roomId: number, payload: unknown) {
    const room = this.rooms.get(roomId);

    console.log("Broadcast room:", roomId);

    if (!room) {
      console.log("Room not found");
      return;
    }

    console.log("Clients:", room.size);

    const message = JSON.stringify(payload);

    for (const socket of room) {
      console.log("Sending to:", socket.user?.name);
      socket.send(message);
    }
  }
}

const roomManager = new RoomManager();

export default roomManager;
