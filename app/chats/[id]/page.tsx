import ChatMessagesList from "@/Components/chat-messages-list";
import ChatHeader from "@/Components/chatHeader";
import getSession from "@/lib/auth/session/getSession";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

async function getRoom(id: string) {
  const room = await db.chatRoom.findUnique({
    where: {
      id,
    },
    include: {
      users: {
        select: { id: true, username: true, avatar: true },
      },
    },
  });
  if (room) {
    const session = await getSession();
    const canSee = Boolean(room.users.find((user) => user.id === session.id!));
    if (!canSee) {
      return null;
    }
  }
  return room;
}

async function getMessages(chatRoomId: string) {
  const messages = await db.message.findMany({
    where: {
      chatRoomId,
    },
    select: {
      id: true,
      payload: true,
      created_at: true,
      userId: true,
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
  });
  return messages;
}

async function getUserProfile() {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id!,
    },
    select: {
      username: true,
      avatar: true,
    },
  });
  return user;
}

export type InitialChatMessages = Prisma.PromiseReturnType<typeof getMessages>;

export default async function ChatRoom({ params }: { params: { id: string } }) {
  const room = await getRoom(params.id);
  if (!room) {
    return notFound();
  }
  const initialMessages = await getMessages(params.id);
  const session = await getSession();
  const user = await getUserProfile();
  if (!user) {
    return notFound();
  }
  const otherUser = room.users.find((u) => u.id !== session.id);
  return (
    <>
      {otherUser && (
        <ChatHeader
          user={{
            id: otherUser.id,
            username: otherUser.username,
            avatar: otherUser.avatar ?? "",
          }}
        />
      )}
      <div className="relative">
        <ChatMessagesList
          chatRoomId={params.id}
          userId={session.id!}
          username={user.username}
          avatar={user.avatar!}
          initialMessages={initialMessages}
        />
      </div>
    </>
  );
}
