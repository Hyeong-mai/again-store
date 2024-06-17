import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/auth/session/getSession";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/": true,
  "/login": true,
  "/create-account": true,
  "/github/start": true,
  "/github/complete": true,
  "/home": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const isPublicUrl = publicOnlyUrls[request.nextUrl.pathname];

  if (!session.id && !isPublicUrl) {
    // 세션이 없고, 접근할 수 없는 페이지에 접근 시
    return NextResponse.redirect(new URL("/login", request.url)); // 기본적으로 로그인 페이지로 리디렉션
  } else if (
    !session.id &&
    (request.nextUrl.pathname === "/profile" ||
      request.nextUrl.pathname === "/chat")
  ) {
    // 세션이 없고, 프로필 페이지 또는 채팅 페이지에 접근 시
    return NextResponse.redirect(new URL("/login", request.url)); // 로그인 페이지로 리디렉션
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
