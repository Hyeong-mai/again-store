import db from "@/lib/db";
import getSession from "@/lib/auth/session/getSession";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const getUser = async () => {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
};

async function Username() {
  const user = await getUser();
  return <h1>Welcome! {user?.username}!</h1>;
}
export default async function Profile() {
  const logOut = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  };
  return (
    <div>
      <Suspense fallback={"Welcome!"}>
        <Username />
      </Suspense>
      <form action={logOut}>
        <button>Log out</button>
      </form>
    </div>
  );
}
