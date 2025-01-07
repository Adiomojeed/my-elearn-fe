/** @format */

"use client";

import Link from "next/link";
import { createElement } from "react";

import { useSelectedLayoutSegment } from "next/navigation";
import Dashboard from "../icons/Dashboard";
import Announcements from "../icons/Announcements";
import Courses from "../icons/Courses";
import Assignments from "../icons/Assignments";
import Quizzes from "../icons/Quizzes";
import Folder from "../icons/Folder";
import Settings from "../icons/Settings";

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
    icon: Courses,
    targetSegment: "courses",
  },
  {
    href: "/assignments",
    label: "Assignments",
    icon: Assignments,
    targetSegment: "assignments",
  },
  {
    href: "/quizzes",
    label: "Quizzes",
    icon: Quizzes,
    targetSegment: "quizzes",
  },
  {
    href: "/folders",
    label: "My Folder",
    icon: Folder,
    targetSegment: "folders",
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
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
      className={`absolute flex flex-col bg-white top-0 z-[100] h-full w-full py-8 lg:py-10 px-5 max-w-[304px] md:max-w-[250px] lg:max-w-[280px] xl:max-w-[304px] transition-[left] duration-[750ms] md:static ${
        isOpen ? "left-0" : "-left-[304px] md:left-0"
      }`}
    >
      <button className="absolute right-4 top-4 md:hidden" onClick={onClose}>
        x
      </button>
      <Link className="border-b block border-[#F2F2F2] pb-5" href={"/"}>
        <img src="/logo.svg" alt="logo" />
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
      </div>
      <div className="mt-auto xl:px-3 pt-5 pb-3 border-t border-[#F2F2F2] flex gap-3">
        <img src="/avatar.svg" className="w-12 h-12" alt="avatar" />
        <div>
          <h6 className="lg:text-lg leading-[26px]">Adio Mojeed</h6>
          <small className="text-grey-200 leading-[26px]">LRN2024-001</small>
        </div>
        <button
          className="ml-auto"
          onClick={() => {
            onClose();
            // logoutUser();
          }}
        >
          <img src="/logout.svg" alt="logout icon" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
