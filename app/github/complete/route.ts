import db from "@/lib/db";
import getAccessToken from "@/lib/auth/github/getAccessToken";
import getGithubEmail from "@/lib/auth/github/getGithubEmail";
import getGithubProfile from "@/lib/auth/github/getGithubProfile";
import getSession from "@/lib/auth/session/getSession";
import { SaveSession } from "@/lib/auth/session/updateSession";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";
import isExistUsername from "@/lib/auth/isExistUsername";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }
  const { error, access_token } = await getAccessToken(code);
  if (error) {
    return new Response(null, {
      status: 400,
    });
  }
  //const email = await getGithubEmail(access_token);
  const { id, name, profile_photo } = await getGithubProfile(access_token);
  const user = await db.user.findUnique({
    where: {
      github_id: id + "",
    },
    select: {
      id: true,
    },
  });
  if (user) {
    await SaveSession(user.id);
    return redirect("/profile");
  }
  const isExist = await isExistUsername(name);
  const newUser = await db.user.create({
    data: {
      username: isExist ? `${name}_gh` : name,
      github_id: id + "",
      avatar: profile_photo,
    },
    select: {
      id: true,
    },
  });
  await SaveSession(newUser.id);
  return redirect("/profile");
}
