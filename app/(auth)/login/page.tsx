"use client";

import SocialLogin from "@/Components/social-login";
import { useFormState } from "react-dom";
import { logIn } from "./action";
import Input from "@/Components/input";
import Button from "@/Components/button";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import Link from "next/link";

export default function Login() {
  const [state, action] = useFormState(logIn, null);
  return (
    <div className="flex flex-col gap-10 py-6 w-full">
      <div className="flex w-full items-center justify-center flex-col gap-2 p-10">
        <div className="w-1/5">
          <h1 className="text-5xl font-bold italic">AGAIN</h1>
        </div>
        <h2 className="text-lg font-bold italic">REDISCOVER VALUE, AGAIN</h2>
      </div>
      <form action={action} className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h1 className="font-bold">이메일 주소</h1>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              required
              errors={state?.fieldErrors.email}
            />
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="font-bold">비밀번호</h1>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              required
              minLength={PASSWORD_MIN_LENGTH}
              errors={state?.fieldErrors.password}
            />
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center justify-center">
          <Button text="로그인" />
          <Link href={"/create-account"}>
            <h1 className="text-lg text-gray-700">회원가입</h1>
          </Link>
        </div>
      </form>
      <SocialLogin />
    </div>
  );
}
