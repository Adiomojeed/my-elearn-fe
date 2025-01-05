"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const router = useRouter();
  return <main className="text-dark-900">{children}a</main>;
};

export default Layout;
