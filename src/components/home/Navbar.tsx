"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../Button";

const Navbar = () => {
  return (
    <nav className="h-[80px] bg-white md:h-[98px] flex items-center justify-center sticky top-0 z-[10]">
      <div className="w-full h-full max-w-[1440px] flex items-center p-3 lg:px-5 xl:px-12 justify-between">
        <Link href="/">
          <Image src="logo.svg" alt="logo" width={121} height={71} priority />
        </Link>

        <div className="">
          <Link href="/sign-in">
            <Button size="lg">Log in</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
