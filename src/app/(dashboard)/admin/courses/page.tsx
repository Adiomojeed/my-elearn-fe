"use client";

import { useGetUsers } from "@/api/admin";
import { UserData } from "@/api/auth";
import Button from "@/components/Button";
import CourseTableRow from "@/components/dashboard/admin/CourseTableRow";
import UsersTableRow from "@/components/dashboard/admin/UsersTableRow";
import Stats, { StatsProps } from "@/components/dashboard/Stats";
import CreateCourseModel from "@/components/modals/CreateCourseModal";
import CreateUserModal from "@/components/modals/CreateUserModal";
import useDisclosure from "@/hooks/useDisclosure";
import { useMemo, useState } from "react";

const Page = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const limit = 20;
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = useGetUsers({ limit, page });
  const users = (data as any)?.users as UserData[];

  const stats = useMemo(
    () => [
      {
        title: "Total Courses",
        value: (data as any)?.totalUsers ?? 0,
        icon: "/enrolled.svg",
      },
      {
        title: "Active",
        value: (data as any)?.counts?.students ?? 0,
        icon: "/enrolled.svg",
      },
      {
        title: "Inactive",
        value: (data as any)?.counts?.educators ?? 0,
        icon: "/enrolled.svg",
      },
    ],
    [users]
  );
  return (
    <section className="flex flex-col h-full">
      <div className="bg-white border mb-5 border-[#F3F3F3] p-3 lg:p-4 flex flex-col lg:flex-row lg:items-center gap-2 justify-between">
        <div>
          <p className="font-medium">Courses</p>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
            {stats.map((i: StatsProps, idx) => (
              <Stats key={idx} stat={i} />
            ))}
          </div>
        </div>
        <Button
          onClick={onOpen}
          type="submit"
          className="px-4 text-sm"
          size="md"
        >
          Create Course
        </Button>
        <CreateCourseModel isOpen={isOpen} onClose={onClose} />
      </div>

      <table className="mt-3 bg-white w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student Name</th>
            <th className="hidden lg:table-cell">Email</th>
            <th className="hidden lg:table-cell">Courses</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((i, idx: number) => (
            <CourseTableRow key={idx} user={i} />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Page;
