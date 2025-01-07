/** @format */

"use client";

import Link from "next/link";
import { useState, type ReactNode, useEffect } from "react";

// import { useGetUserData } from "~/apis/user";
import useDisclosure from "@/hooks/useDisclosure";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isClient, setIsClient] = useState(false);

  // const {} = useGetUserData(isClient);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="flex h-screen w-screen">
      {isOpen && (
        <div
          onClick={onClose}
          className="absolute left-0 top-0 z-[50] h-screen w-screen bg-[#054F31] bg-opacity-30"
        ></div>
      )}
      <Sidebar isOpen={isOpen} onClose={onClose} />
      {isClient ? (
        <section className="flex h-full w-full flex-col overflow-scroll bg-[#F9F9F9]">
          <Navbar onOpen={onOpen} />
          <div className="mx-auto w-full max-w-[1136px] px-4 py-6 md:px-6">
            {children}
          </div>
        </section>
      ) : (
        <div className="flex-center h-full w-full">
          {/* <Spinner
            thickness="5px"
            speed="1s"
            color="#042515"
            width="60px"
            height="60px"
          /> */}
        </div>
      )}
    </main>
  );
};
export default DashboardLayout;
