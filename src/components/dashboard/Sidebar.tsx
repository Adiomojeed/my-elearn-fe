/** @format */

"use client";

import Link from "next/link";
import { createElement, useMemo } from "react";

import { useSelectedLayoutSegments } from "next/navigation";
import Dashboard from "../icons/Dashboard";
import Announcements from "../icons/Announcements";
import Courses from "../icons/Courses";
import Assignments from "../icons/Assignments";
import Quizzes from "../icons/Quizzes";
import Folder from "../icons/Folder";
import Settings from "../icons/Settings";
import { useAppSelector } from "@/store/useAppSelector";
import { logoutUser } from "@/api/auth";

const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const activeSegments = useSelectedLayoutSegments();
  const activeSegment = activeSegments.join("/");

  const { user } = useAppSelector((s) => s.auth);

  const role = user?.role;

  const links = useMemo(
    () => [
      ...(role === "admin"
        ? [
            {
              label: "Users",
              icon: Dashboard,
              targetSegment: "admin/users",
            },
            {
              label: "Courses",
              icon: Courses,
              targetSegment: "admin/courses",
            },
          ]
        : [
            {
              label: role === "educator" ? "Overview" : "Dashboard",
              icon: Dashboard,
              targetSegment: "dashboard",
            },
            {
              label: "Announcements",
              icon: Announcements,
              targetSegment: "announcements",
              isStudent: true,
            },
            {
              label: role === "educator" ? "Course Management" : "My Courses",
              icon: Courses,
              targetSegment: "courses",
            },
            {
              label: "Assignments",
              icon: Assignments,
              targetSegment: "assignments",
              isStudent: true,
            },
            {
              label: "Quizzes",
              icon: Quizzes,
              targetSegment: "quizzes",
            },
            {
              label: "My Resources",
              icon: Folder,
              targetSegment: "resources",
              isStudent: true,
            },
          ]),
      {
        label: "Settings",
        icon: Settings,
        targetSegment: "settings",
      },
    ],
    []
  );

  return (
    <aside
      className={`absolute flex flex-col bg-white top-0 z-[100] h-full w-full py-8 lg:py-10 px-5 max-w-[304px] md:max-w-[250px] lg:max-w-[280px] xl:max-w-[304px] transition-[left] duration-[750ms] md:static ${
        isOpen ? "left-0" : "-left-[304px] md:left-0"
      }`}
    >
      <button className="absolute right-4 top-4 md:hidden" onClick={onClose}>
        <img src="/close.svg" className="w-6" alt="close icon" />
      </button>
      <Link className="border-b block border-[#F2F2F2] pb-5" href={"/"}>
        <img src="/logo.svg" alt="logo" />
      </Link>
      <div className="mt-3 flex flex-col gap-3">
        {links
          .filter((i) => (role === "educator" ? !i.isStudent : i))
          .map((i, idx) => (
            <Link
              key={idx}
              href={`/${i.targetSegment}`}
              className={`flex h-11 items-center gap-3 rounded px-3 text-sm hover:bg-[#E6F9EE] hover:text-grey-500 ${
                activeSegment === i.targetSegment ||
                (activeSegment.includes("courses") &&
                  i.targetSegment.includes("courses"))
                  ? "bg-[#E6F9EE]"
                  : "text-grey-200"
              }`}
              onClick={onClose}
            >
              {createElement(i.icon, {
                fill:
                  activeSegment === i.targetSegment ||
                  (activeSegment.includes("courses") &&
                    i.targetSegment.includes("courses"))
                    ? "#00B051"
                    : "#B8B8B8",
              })}
              <p className="mt-1">{i.label}</p>
            </Link>
          ))}
      </div>
      <div className="mt-auto xl:px-3 pt-5 pb-3 border-t border-[#F2F2F2] flex gap-3">
        <img
          src={role === "student" ? "/avatar.svg" : "/avatar-l.svg"}
          className="w-12 h-12"
          alt="avatar"
        />
        <div>
          <h6 className="lg:text-lg leading-[26px]">
            {user?.firstname} {user?.lastname}
          </h6>
          <small className="text-grey-200 leading-[26px] uppercase">
            {user?.account_id}
          </small>
        </div>
        <button
          className="ml-auto"
          onClick={() => {
            onClose();
            logoutUser();
          }}
        >
          <img src="/logout.svg" alt="logout icon" />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
