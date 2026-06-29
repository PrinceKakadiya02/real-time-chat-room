import { authOptions } from "@/lib/auth";
import { joinRoom } from "@/lib/services/room.service";
import { joinRoomSchema } from "@/lib/validations/room";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();
    console.log(body);
    const parsed = await joinRoomSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten() },
        { status: 400 },
      );
    }
    const room = await joinRoom({
      name: parsed.data.name,
      password: parsed.data.password,
      userId: String(session.user.id),
    });

    return NextResponse.json({
      roomId: room.id,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message === "Room not found" ||
        error.message === "Invalid password"
      ) {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 404 },
        );
      }
      console.log(error);
      return NextResponse.json(
        { success: false, message: "internal server error" },
        { status: 500 },
      );
    }
  }
}
