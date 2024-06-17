import ListChat from "@/Components/ChatList";
import getSession from "@/lib/auth/session/getSession";
import db from "@/lib/db";
import { unstable_cache as nextCache } from "next/cache";

const getChats = async (userId: number) => {
  const chats = await db.chatRoom.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
    select: {
      id: true,
      messages: {
        take: 1,
        orderBy: {
          created_at: "desc",
        },
      },
      users: {
        where: {
          id: {
            not: userId,
          },
        },
        select: {
          avatar: true,
          username: true,
        },
      },
    },
  });
  return chats;
};

// const getCachedChats = nextCache(getChats, ["chat-list"], {
//   tags: ["chat-list"],
// });

const ChatPage = async () => {
  const session = await getSession();
  const chats = await getChats(session.id!);
  return (
    <div>
      {chats.map((chat, idx) => (
        <ListChat
          id={chat.id}
          key={idx}
          messages={chat.messages}
          users={chat.users}
          userId={session.id!}
        />
      ))}
    </div>
  );
};

export default ChatPage;
