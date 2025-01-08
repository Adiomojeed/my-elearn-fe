/** @format */

import { useAppSelector } from "@/store/useAppSelector";

const Navbar = ({ onOpen }: { onOpen: () => void }) => {
  const {
    auth: { user },
  } = useAppSelector((s) => s);

  const role = user?.role;

  return (
    <nav className="sticky top-0 !z-[10] flex min-h-16 md:min-h-20 lg:min-h-[86px] items-center bg-white">
      <div className="mx-auto flex w-full max-w-[1136px] items-center px-4 md:px-6">
        <h6 className="md:text-lg font-medium">Welcome back, Mojeed</h6>
        <img
          alt="avatar"
          src={role === "student" ? "/avatar.svg" : "/avatar-l.svg"}
          className="ml-auto w-9 md:w-12 h-12"
        />
        <button className="ml-2 md:hidden" onClick={onOpen}>
          <img src="/hamburger.svg" className="w-7" alt="hamburger icon" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
