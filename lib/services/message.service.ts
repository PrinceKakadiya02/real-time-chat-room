import prisma from "@/lib/prisma";

type CreateMessageParams = {
  roomId: number;
  senderId: string;
  content: string;
};

export async function createMessage({
  roomId,
  senderId,
  content,
}: CreateMessageParams) {
  const membership = await prisma.roomMember.findUnique({
    where: {
      roomId_userId: {
        roomId,
        userId: senderId,
      },
    },
  });

  if (!membership) {
    throw new Error("You are not a member of this room.");
  }

  const message = await prisma.message.create({
    data: {
      roomId,
      senderId,
      content,
    },
  });

  return message;
}