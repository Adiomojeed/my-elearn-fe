"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const Layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const router = useRouter();
  return (
    <div className="h-screen w-screen grid md:grid-cols-2">
      <div className="hidden md:flex flex-center bg-[url('/auth-bg.png')] bg-no-repeat bg-cover">
        <img src="/logo-white.svg" alt="" />
      </div>
      <div className="bg-white flex items-center">
        <div className="w-full max-w-[710px] xl:px-[110px] p-5 md:px-8 py-3 md:py-5 pb-8 lg:pb-12">
          <button
            onClick={() => router.back()}
            className="flex text-sm lg:text-base items-center gap-2 lg:gap-4 mb-8 lg:mb-[52px]"
          >
            <img src="/arrow-back.svg" alt="" />
            Back to Homepage
          </button>

          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
