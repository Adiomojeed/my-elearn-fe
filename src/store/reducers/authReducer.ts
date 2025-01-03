/** @format */

import { EDIT_USER, AUTH_USER, LOGOUT } from "./types";
import { type AuthStateType } from "./stateTypes";

const initialState = {
  user: null,
  authenticated: null,
};

export default function authReducer(
  state = initialState,
  action: { payload: any; type: any },
): AuthStateType {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      };
    case EDIT_USER:
      return {
        ...state,
        user: { ...(state.user as any), ...action.payload },
      };
    case LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
}
