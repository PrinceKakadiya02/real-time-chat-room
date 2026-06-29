import { authOptions } from "@/lib/auth";
import { createRoom } from "@/lib/services/room.service";
import { createRoomSchema } from "@/lib/validations/room";
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
    const parsed = createRoomSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const room = await createRoom({
      name: parsed.data.name,
      password: parsed.data.password,
      creatorId: String(session.user.id),
    });

    return NextResponse.json(
      { success: true, roomId: room.id },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Room already exists") {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 409 },
        );
      }
    }

    console.log(error);
    return NextResponse.json(
      { success: false, message: "internal server error" },
      { status: 500 },
    );
  }
}
