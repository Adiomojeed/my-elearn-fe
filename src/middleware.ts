/** @format */

import { NextResponse, type NextRequest } from "next/server";
import { tokenConfig } from "@/api/request";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPath = [
    "/sign-in",
    "/sign-up",
    // "/forgot-password",
    // "/verify-account",
    // "/reset-password",
  ];

  const isPublicPath = publicPath.includes(path);

  const token = request.cookies.get(tokenConfig.key.token)?.value ?? "";


  // if (!isPublicPath && token.length <= 0) {
  //   return NextResponse.redirect(new URL("/sign-in", request.url));
  // }

  // if (isPublicPath && token.length > 0) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    // "/verify-email",
    // "/forgot-password",
    // "/verify-account",
    // "/reset-password",
    "/dashboard",
    "/volume-calculator",
  ],
};
