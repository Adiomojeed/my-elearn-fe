/** @format */

import { NextResponse, type NextRequest } from "next/server";
import { tokenConfig } from "@/api/request";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const cspHeader = `
    default-src 'self';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim()

  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )

  requestHeaders.set('X-Frame-Options', 'DENY');
  requestHeaders.set('Content-Security-Policy', "frame-ancestors 'none'");
  const res = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  res.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  )
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('Content-Security-Policy', "frame-ancestors 'none'");


  // Set security headers to prevent iframe embedding

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
