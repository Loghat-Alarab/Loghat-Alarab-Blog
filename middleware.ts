import { getSessionCookie } from "better-auth";
import { NextRequest, NextResponse } from "next/server";

import {
  privateRoutes,
  authRoutesPrefix,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request, {
    cookiePrefix: "loghat-alarab",
  });
  const pathname = request.nextUrl.pathname;
  // Optionally pass config as the second argument if cookie name or prefix is customized.
  const isLoggedIn = !!sessionCookie;
  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isPrivateRoute = privateRoutes.includes(pathname);
  const isAuthRoute = pathname.startsWith(authRoutesPrefix);

  if (isApiAuthRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, request.nextUrl)
      );
    }
    return NextResponse.next();
  }

  if (!sessionCookie && isPrivateRoute) {
    console.log(pathname);

    let callbackURL = pathname;

    if (request.nextUrl.search) {
      callbackURL += request.nextUrl.search;
    }

    const encodedCallbackURL = encodeURIComponent(callbackURL);

    return NextResponse.redirect(
      new URL(`/auth/login?callbackURL=${encodedCallbackURL}`, request.nextUrl)
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
