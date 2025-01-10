
"use server";

import { cookies } from "next/headers";

export const createCookie = (name: string, value: string) => {
  cookies().set(name, value);
};

export const deleteCookie = (name?: string) => {
  // cookies().delete(name);
  cookies()
    .getAll()
    .forEach((cookie) => {
      cookies().delete(cookie.name);
    });
};
