"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  const { pending } = useFormStatus();
  console.log(pending);
  return (
    <button
      disabled={pending}
      className="primary-btn rounded-2xl h-16 text-xl  disabled:bg-gray-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
