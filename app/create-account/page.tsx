"use client";

import FormButton from "@/Components/form-btn";
import FormInput from "@/Components/form-input";
import SocialLogin from "@/Components/social-login";
import { useFormState } from "react-dom";
import createAccount from "./action";

export default function CreateAccount() {
  const [state, action] = useFormState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput
          name="username"
          type="text"
          placeholder="Username"
          required
        />
        <FormInput name="email" type="email" placeholder="Email" required />
        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <FormInput
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required
        />
        <FormButton text="Create Account" />
      </form>
      <SocialLogin />
    </div>
  );
}
