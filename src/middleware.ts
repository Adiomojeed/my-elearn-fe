/** @format */

import { NextResponse, type NextRequest } from "next/server";
import { tokenConfig } from "@/api/request";

export function middleware(request: NextRequest) {
  const res = NextResponse.next();

  // Set security headers to prevent iframe embedding
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('Content-Security-Policy', "frame-ancestors 'none'");
  const path = request.nextUrl.pathname;
  const publicPath = [
    "/",
    "/sign-in",
    "/forgot-password",
    "/reset-password",
  ];

  const isPublicPath = publicPath.includes(path);

  const token = request.cookies.get(tokenConfig.key.token)?.value ?? "";
  const role = request.cookies.get(tokenConfig.key.role)?.value ?? "";


  if (!isPublicPath && token.length <= 0) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isPublicPath && token.length > 0) {
    if (role === "admin") return NextResponse.redirect(new URL("/admin/users", request.url));
    else return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/sign-in",
    "/forgot-password",
    "/reset-password",
    "/dashboard",
    "/announcements",
    "/assignments",
    "/courses",
    "/courses/:id",
    "/resources",
    "/settings",
    "/admin/users",
    "/admin/courses"
  ],
};
