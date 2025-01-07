/** @format */

import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/store/useAppSelector";

const Navbar = ({ onOpen }: { onOpen: () => void }) => {
  const {
    auth: { user },
  } = useAppSelector((s) => s);
  return (
    <nav className="sticky top-0 !z-[10] flex min-h-16 md:min-h-20 lg:min-h-[86px] items-center bg-white">
      <div className="mx-auto flex w-full max-w-[1136px] items-center px-4 md:px-6">
        <h6 className="md:text-lg font-medium">Welcome back, Mojeed</h6>
        <img
          alt="avatar"
          src={
            // user?.PD_ProfileImage
            //   ? `${user?.PD_ProfileImage}?${new Date().getTime()}`
            //   : 
              "/avatar.svg"
          }
      
          className="ml-auto rounded-full"
        />
        <button className="ml-2 md:hidden" onClick={onOpen}>
          hm
          {/* <HambergerMenu size="24" color="#000000" /> */}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
