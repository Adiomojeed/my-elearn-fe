/** @format */

import { type UserData } from "@/api/auth";

export type AuthStateType = {
  authenticated: boolean | null;
  user: UserData | null;
};


export type RootState = {
  auth: AuthStateType;
};
