"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../Button";
import { SyntheticEvent } from "react";

const handleScroll = (e: SyntheticEvent) => {
  e.preventDefault();

  const href = (e.currentTarget as any).href;
  const targetId = href.replace(/.*\#/, "");

  const elem = document.getElementById(targetId);
  elem?.scrollIntoView({
    behavior: "smooth",
  });
};

const Navbar = () => {
  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Pricing", href: "#pricing" },
    { name: "Agents", href: "#agents" },
    { name: "Contact us", href: "#contact" },
  ];
  
  return (
    <nav className="h-[80px] md:h-[98px] bg-[#FFF9F8] flex items-center justify-center sticky top-0 z-[10] border-b border-b-[#EBEFF3]">
      <div className="w-full h-full max-w-[1440px] flex items-center p-3 lg:px-5 xl:px-12 justify-between">
        <Link href="/">
          <Image src="logo.svg" alt="logo" width={121} height={71} priority />
        </Link>
        <div className="hidden md:flex items-center gap-10">
          {links.map((i, idx) => (
            <Link
              key={idx}
              onClick={handleScroll}
              href={i.href}
              className={`text-base leading-6 font-semibold`}
            >
              {i.name}
            </Link>
          ))}
        </div>
        <div className="">
          <Link href="/sign-in">
            <Button>Sign in</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
