import dotenv from "dotenv";
import { WebSocketServer } from "ws";

import connectionManager from "./connection-manager.js";
import prisma from "./prisma.js";
import roomManager from "./room-manager.js";
import type { AuthenticateSocket } from "./types.js";

dotenv.config();
console.log(process.env.DATABASE_URL);

const PORT = Number(process.env.PORT) || 8080;

const wss = new WebSocketServer({
  port: PORT,
});
wss.on("connection", async (socket: AuthenticateSocket, request) => {
  socket.on("message", (message) => {
    console.log("RAW MESSAGE:", message.toString());
  });
  console.log(request.headers);
  try {
    const cookieHeader = request.headers.cookie;

    if (!cookieHeader) {
      socket.close();
      return;
    }

    const cookies = Object.fromEntries(
      cookieHeader.split(/;\s*/).map((cookie): [string, string] => {
        const [name, ...rest] = cookie.split("=");

        return [name ?? "", rest.join("=")];
      }),
    );

    const sessionToken =
      cookies["next-auth.session-token"] ??
      cookies["__Secure-next-auth.session-token"];

    if (!sessionToken) {
      socket.close();
      return;
    }

    const session = await prisma.session.findUnique({
      where: {
        sessionToken,
      },
      include: {
        user: true,
      },
    });

    if (!session) {
      socket.close();
      return;
    }

    if (session.expires < new Date()) {
      socket.close();
      return;
    }

    socket.user = session.user;
    connectionManager.addConnection(socket);

    console.log(`✅ ${socket.user.name ?? socket.user.email} connected`);

    socket.send(
      JSON.stringify({
        type: "CONNECTED",
        user: socket.user.name ?? socket.user.email,
      }),
    );

    socket.on("message", async (message) => {
      console.log("Received:", message.toString());
      try {
        const data = JSON.parse(message.toString());

        if (data.type === "JOIN_ROOM") {
          const roomId = Number(data.roomId);

          const membership = await prisma.roomMember.findUnique({
            where: {
              roomId_userId: {
                roomId,
                userId: socket.user!.id,
              },
            },
          });

          if (!membership) {
            socket.send(
              JSON.stringify({
                type: "ERROR",
                message: "You are not a member of this room.",
              }),
            );

            return;
          }

          roomManager.joinRoom(socket, roomId);

          socket.send(
            JSON.stringify({
              type: "ROOM_JOINED",
              roomId,
            }),
          );
        }

        if (data.type === "SEND_MESSAGE") {
          if (!socket.roomId) {
            socket.send(
              JSON.stringify({
                type: "ERROR",
                message: "Join a room first.",
              }),
            );
            return;
          }

          const content = String(data.content).trim();

          if (!content) {
            return;
          }

          const savedMessage = await prisma.message.create({
            data: {
              roomId: socket.roomId,
              senderId: socket.user!.id,
              content,
            },
            include: {
              sender: true,
            },
          });

          roomManager.broadcast(socket.roomId, {
            type: "NEW_MESSAGE",
            message: {
              id: savedMessage.id,
              content: savedMessage.content,
              createdAt: savedMessage.createdAt,
              sender: {
                id: savedMessage.sender.id,
                name: savedMessage.sender.name,
                image: savedMessage.sender.image,
              },
            },
          });
          console.log("Broadcasting...");
        }
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("close", () => {
      connectionManager.removeConnection(socket);

      console.log(`❌ ${socket.user?.name ?? socket.user?.email} disconnected`);
    });
  } catch (error) {
    console.error(error);
    socket.close();
  }
});

console.log(`🚀 WebSocket Server running on ws://localhost:${PORT}`);
