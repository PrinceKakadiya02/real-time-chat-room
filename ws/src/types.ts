import { User } from "@prisma/client";
import { WebSocket } from "ws";

export interface AuthenticateSocket extends WebSocket {
  user?: User;
  roomId?: number;
}