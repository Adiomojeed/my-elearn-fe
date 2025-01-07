/** @format */

import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/store/useAppSelector";

const Navbar = ({ onOpen }: { onOpen: () => void }) => {
  const {
    auth: { user },
  } = useAppSelector((s) => s);
  return (
    <nav className="sticky top-0 !z-[10] flex max-h-16 min-h-[64px] items-center border-b-[1px] border-solid border-[#E4E7EC] bg-[#F9FAFB]">
      <div className="justifyend mx-auto flex w-full max-w-[1300px] items-center px-6 md:px-6">
        <Link
          className="text-base font-bold text-green-100 md:hidden"
          href={"/"}
        >
          GreenFlags
        </Link>
        {/* <img
          alt="avatar"
          src={
            user?.PD_ProfileImage
              ? `${user?.PD_ProfileImage}?${new Date().getTime()}`
              : "/avatar.svg"
          }
      
          className="ml-auto hidden h-8 w-8 rounded-full md:block"
        /> */}
        <button className="ml-auto md:hidden" onClick={onOpen}>
          hm
          {/* <HambergerMenu size="24" color="#000000" /> */}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
