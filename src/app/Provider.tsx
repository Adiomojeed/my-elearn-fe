"use client";

import { saveState } from "@/store/localStorage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ToastContainer } from "react-toastify";

store.subscribe(() => {
  saveState(store.getState());
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

export default function ParentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const windowView = () => {
    if (typeof window !== "undefined") {
      return window?.innerHeight * 0.01;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let script = document.createElement("script");
      script.async = true;
      script.append(`document.documentElement.style.setProperty("--vh", "${
        window?.innerHeight * 0.01
      }px");
`);
      document.body.appendChild(script);
      window.addEventListener("resize", () => {
        script = document.createElement("script");
        script.append(`document.documentElement.style.setProperty("--vh", "${
          window?.innerHeight * 0.01
        }px");
`);
        document.body.appendChild(script);

        return () => {
          document.body.removeChild(script);
        };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowView()]);

  if (process.env.NEXT_PUBLIC_ENV !== "development") {
    console.log = () => {};
    console.error = () => {};
    console.debug = () => {};
  }

  return (
    <>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>{children}</Provider>
      </QueryClientProvider>
    </>
  );
}
