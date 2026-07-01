import { AuthenticateSocket } from "./types.js";

class ConnectionManager {
  private connections = new Map<string, AuthenticateSocket>();

  addConnection(socket: AuthenticateSocket) {
    if (!socket.user) {
      return;
    }

    this.connections.set(socket.user.id, socket);

    console.log(`Connected Users: ${this.connections.size}`);
  }

  removeConnection(socket: AuthenticateSocket) {
    if (!socket.user) {
      return;
    }

    this.connections.delete(socket.user.id);

    console.log(`Connected Users: ${this.connections.size}`);
  }

  getConnection(userId: number) {
    return this.connections.get(String(userId));
  }

  getAllConnections() {
    return this.connections;
  }
}

export default new ConnectionManager();
