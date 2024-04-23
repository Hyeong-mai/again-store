import FormButton from "@/Components/button";
import FormInput from "@/Components/input";
import SocialLogin from "@/Components/social-login";

export default function SMSLogin() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Log in</h1>
        <h2 className="text-xl">Verify your phone number.</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput
          name="number"
          type="number"
          placeholder="Phone number"
          required
          errors={[]}
        />
        <FormInput
          name="number"
          type="number"
          placeholder="Verification code"
          required
          errors={[]}
        />
        <FormButton text="Verify" />
      </form>
      <SocialLogin />
    </div>
  );
}
