import { redirect } from "next/navigation";
import getSession from "./getSession";

export async function SaveSession(id: number) {
  const session = await getSession();
  session.id = id;
  await session.save();
  redirect("/profile");
}
