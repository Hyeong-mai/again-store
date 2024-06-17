"use client";
import { InitialChatMessages } from "@/app/chats/[id]/page";
import { formatToTimeAgo } from "@/lib/utils";
import { ArrowUpCircleIcon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { createClient, RealtimeChannel } from "@supabase/supabase-js";
import { saveMessage } from "@/app/chats/action";

const SUPABASE_URL = "https://gexfsdgwowdmmjgvwfmo.supabase.co";
const SUPABASE_PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdleGZzZGd3b3dkbW1qZ3Z3Zm1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU4Mjc3NjIsImV4cCI6MjAzMTQwMzc2Mn0.hNJ8gHeniON4p7EYOhjHLJGJTu7UzEcEQshssIp8PDU";

interface ChatMessageListProps {
  initialMessages: InitialChatMessages;
  userId: number;
  chatRoomId: string;
  username: string;
  avatar: string;
}

export default function ChatMessagesList({
  initialMessages,
  userId,
  chatRoomId,
  username,
  avatar,
}: ChatMessageListProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");
  const channel = useRef<RealtimeChannel>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setMessage(value);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newMessage = {
      id: Date.now(),
      payload: message,
      created_at: new Date(),
      userId,
      user: {
        username,
        avatar,
      },
    };
    setMessages((prevMsgs) => [...prevMsgs, newMessage]);
    channel.current?.send({
      type: "broadcast",
      event: "message",
      payload: newMessage,
    });
    await saveMessage(message, chatRoomId);
    setMessage("");
    scrollToBottom();
  };

  useEffect(() => {
    const client = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
    channel.current = client.channel(`room-${chatRoomId}`);
    channel.current
      .on("broadcast", { event: "message" }, (payload) => {
        setMessages((prevMsgs) => [...prevMsgs, payload.payload]);
      })
      .subscribe();
    scrollToBottom();
    return () => {
      channel.current?.unsubscribe();
    };
  }, [chatRoomId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="p-5 flex flex-col gap-1 min-h-screen justify-end">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-2 items-start ${
            message.userId === userId ? "justify-end" : ""
          }`}
        >
          {message.userId === userId ? null : message.user.avatar !== null ? (
            <Image
              src={message.user.avatar!}
              alt={message.user.username}
              width={50}
              height={50}
              className="size-8 rounded-full"
            />
          ) : (
            <UserIcon className="size-10 text-gray-300 border rounded-full" />
          )}
          <div
            className={`flex flex-col gap-1 ${
              message.userId === userId ? "items-end" : ""
            }`}
          >
            <span
              className={`${
                message.userId === userId
                  ? "bg-green-400 text-white"
                  : "bg-gray-200"
              } px-5 py-2.5 rounded-2xl`}
            >
              {message.payload}
            </span>
            <span className="text-xs">
              {/* {formatToTimeAgo(message.created_at.toString())} */}
            </span>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
      <form
        className="flex gap-4 items-center justify-between fixed bottom-0 p-10 bg-white w-full mx-auto max-w-screen-sm"
        onSubmit={onSubmit}
      >
        <input
          required
          onChange={onChange}
          value={message}
          className="bg-transparent text-lg rounded-full w-full h-14 focus:outline-none px-7 ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-neutral-50 border-none placeholder:text-neutral-400"
          type="text"
          name="message"
          placeholder="Write a message..."
        />
        <button className="w-1/12">
          <ArrowUpCircleIcon className="size-14 text-black transition-colors  hover:text-green-400" />
        </button>
      </form>
    </div>
  );
}
