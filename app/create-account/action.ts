"use server";
import { z } from "zod";

const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);

const checkUsername = (username: string) => !username.includes("potato");

const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string!",
        required_error: "where is my username?",
      })
      .min(3, " Way too short!")
      .max(10, "That is too long!")
      .trim()
      .toLowerCase()
      .refine(checkUsername, "No potato allowed!"),
    email: z.string().email().trim().toLowerCase(),
    password: z
      .string()
      .min(10)
      .regex(
        passwordRegex,
        "Passwords must contain at least one UPPERCASE, lowercase, number and special characters #?!@$%^&*-"
      ),
    confirmPassword: z.string().min(10),
  })
  .refine(checkPassword, {
    message: "Both passwords should be the same!",
    path: ["confirmPassword"],
  });

export default async function createAccount(
  prevState: any,
  formData: FormData
) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
