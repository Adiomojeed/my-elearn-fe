/** @format */

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";
import { loadState } from "./localStorage";

const preloadedState = loadState();

const logger = (store: any) => (next: any) => (action: any) => {
  console.log("dispatching", action);
  const result = next(action);
  console.log("next state", store.getState());
  return result;
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ immutableCheck: false }).concat(logger),
  devTools: process.env.NEXT_PUBLIC_ENV !== "production",
  preloadedState,
});

export type AppDispatch = typeof store.dispatch;
