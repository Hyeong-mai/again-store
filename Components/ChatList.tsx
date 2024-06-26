import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

interface IListChatProps {
  id: string;
  users: {
    username: string;
    avatar: string | null;
  }[];
  messages: {
    id: number;
    payload: string;
    created_at: Date;
    updated_at: Date;
    chatRoomId: string;
    userId: number;
    isRead: boolean;
  }[];
  userId: number;
}

const ListChat = ({ id, users, messages, userId }: IListChatProps) => {
  const user = users[0];
  const message = messages[0];
  return (
    <Link
      href={`/chats/${id}`}
      className="flex gap-5 p-5 items-center shadow-inner_b hover:opacity-80 transition-opacity"
    >
      <div className="size-16 rounded-full flex item-center justify-center overflow-hidden">
        {user?.avatar ? (
          <Image
            src={user?.avatar ?? ""}
            alt={user?.username}
            width={60}
            height={60}
            className="rounded-md overflow-hidden"
          />
        ) : (
          <UserIcon className="w-full h-full bg-gray-200 text-gray-400 " />
        )}
      </div>

      <div>
        <h1 className="text-lg text-black">{user?.username}</h1>
        {message && (
          <>
            <h3 className="text-sm text-neutral-500">
              <span className="text-neutral-400">
                {message.userId === userId ? "나" : user?.username}:
              </span>{" "}
              {message.payload}
            </h3>
          </>
        )}
      </div>
      {message && !message.isRead && message.userId !== userId && (
        <div className="size-2 rounded-full bg-green-400 ml-auto" />
      )}
    </Link>
  );
};

export default ListChat;
