import bcrypt from "bcrypt";
import prisma from "../prisma";

type CreateRoomParams = {
  name: string;
  password: string;
  creatorId: string;
};

export async function createRoom({
  name,
  password,
  creatorId,
}: CreateRoomParams) {
  const existingRoom = await prisma.room.findUnique({
    where: {
      name,
    },
  });

  if (existingRoom) {
    throw new Error("Room already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const room = await prisma.$transaction(async (tx) => {
    const createdRoom = await tx.room.create({
      data: {
        name,
        passwordHash: hashedPassword,
        createdBy: creatorId,
      },
    });

    await tx.roomMember.create({
      data: {
        roomId: createdRoom.id,
        userId: creatorId,
      },
    });
    return createdRoom;
  });

  return room;
}

type JoinRoomParams = {
  name: string;
  password: string;
  userId: string;
};

export async function joinRoom({ name, password, userId }: JoinRoomParams) {
  const room = await prisma.room.findUnique({
    where: { name },
  });

  if (!room) {
    throw new Error("Room not found");
  }

  const isMatch = await bcrypt.compare(password, room.passwordHash);

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  const exisistingMember = await prisma.roomMember.findUnique({
    where: {
      roomId_userId: {
        roomId: room.id,
        userId,
      },
    },
  });

  if (exisistingMember) {
    return room;
  }

  const members = await prisma.roomMember.count({
    where: {
      roomId: room.id,
    },
  });

  if (members >= room.maxUsers) {
    throw new Error("Room is full");
  }

  await prisma.roomMember.create({
    data: {
      userId,
      roomId: room.id,
    },
  });

  return room;
}

type GetRoomByIdParams = {
  userId: string;
  roomId: number;
};

export async function getRoomById({ userId, roomId }: GetRoomByIdParams) {
  const membership = await prisma.roomMember.findUnique({
    where: {
      roomId_userId: {
        roomId,
        userId,
      },
    },
  });

  if (!membership) {
    return null;
  }

  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
    include: {
      creator: true,
      members: {
        include: {
          user: true,
        },
      },
      messages: {
        include: {
          sender: true,
        },
        orderBy: {
          createdAt: "asc",
        },
        take: 50,
      },
    },
  });

  return room;
}
