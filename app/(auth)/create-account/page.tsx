"use client";

import SocialLogin from "@/Components/social-login";
import { useFormState } from "react-dom";
import createAccount from "./action";
import Input from "@/Components/input";
import Button from "@/Components/button";

export default function CreateAccount() {
  const [state, action] = useFormState(createAccount, null);
  return (
    <div className="flex flex-col items-center justify-center w-full gap-10 py-6">
      <div className="fle p-10 w-full items-center justify-center text-center flex-col gap-2 ">
        <h1 className="text-4xl font-bold">회원가입</h1>
      </div>
      <form action={action} className="w-full flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h1 className="font-bold">이름</h1>
            <Input
              name="username"
              type="text"
              placeholder="Username"
              required
              errors={state?.fieldErrors.username}
              minLength={3}
              maxLength={10}
            />
          </div>
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
              minLength={4}
              errors={state?.fieldErrors.password}
            />
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="font-bold">비밀번호 확인</h1>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              required
              minLength={4}
              errors={state?.fieldErrors.confirmPassword}
            />
          </div>
        </div>

        <Button text="Create Account" />
      </form>
    </div>
  );
}
