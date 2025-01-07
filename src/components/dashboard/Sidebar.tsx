/** @format */

"use client";

import Link from "next/link";
import React, { createElement } from "react";

import { useSelectedLayoutSegment } from "next/navigation";
import Dashboard from "../icons/Dashboard";
import Announcements from "../icons/Announcements";

const links = [
  {
    href: "/dashboard",
    label: "Profile",
    icon: Dashboard,
    targetSegment: "dashboard",
  },
  {
    href: "/announcements",
    label: "Announcements",
    icon: Announcements,
    targetSegment: "announcements",
  },
  {
    href: "/courses",
    label: "My Courses",
    icon: Announcements,
    targetSegment: "courses",
  },
  {
    href: "/assignments",
    label: "Assignments",
    icon: Announcements,
    targetSegment: "assignments",
  },
  {
    href: "/quizzes",
    label: "Quizzes",
    icon: Announcements,
    targetSegment: "quizzes",
  },
  {
    href: "/folders",
    label: "My Folder",
    icon: Announcements,
    targetSegment: "folders",
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Announcements,
    targetSegment: "settings",
  },
];

const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const activeSegment = useSelectedLayoutSegment();
  return (
    <aside
      className={`absolute bg-white top-0 z-[100] h-full min-w-[304px] py-8 lg:py-10 px-5 max-w-[304px] transition-[left] duration-[750ms] md:static ${
        isOpen ? "left-0" : "-left-[304px] md:left-0"
      }`}
    >
      <button className="absolute right-4 top-4 md:hidden" onClick={onClose}>
        x
      </button>
      <Link className="border-b block border-[#F2F2F2] pb-5" href={"/"}>
        <img src="/logo.svg" alt="" />
      </Link>
      <div className="mt-3 flex flex-col gap-3">
        {links.map((i, idx) => (
          <Link
            key={idx}
            href={i.href}
            className={`flex h-11 items-center gap-3 rounded px-3 text-sm hover:bg-[#E6F9EE] hover:text-grey-500 ${
              activeSegment === i.targetSegment
                ? "bg-[#E6F9EE]"
                : "text-grey-200"
            }`}
            onClick={onClose}
          >
            {createElement(i.icon, {
              fill: activeSegment === i.targetSegment ? "#00B051" : "#B8B8B8",
            })}
            <p className="mt-1">{i.label}</p>
          </Link>
        ))}
        {/* <div
          onClick={() => {
            onClose();
            // logoutUser();
          }}
          className={`flex h-11 cursor-pointer items-center gap-3 rounded-lg px-4 text-sm opacity-60 hover:bg-[#ffffff4d] hover:opacity-100`}
        >
          <LogoutCurve size="20" color="#ffffffcc" />
          Logout
        </div> */}
      </div>
    </aside>
  );
};

export default Sidebar;
