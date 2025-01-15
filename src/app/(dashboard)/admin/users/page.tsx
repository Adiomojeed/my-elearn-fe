"use client";

import { useGetUsers } from "@/api/admin";
import { UserData } from "@/api/auth";
import Button from "@/components/Button";
import UsersTableRow from "@/components/dashboard/admin/UsersTableRow";
import Stats, { StatsProps } from "@/components/dashboard/Stats";
import { LoaderContainer, NotFound } from "@/components/Loader";
import CreateUserModal from "@/components/modals/CreateUserModal";
import useDisclosure from "@/hooks/useDisclosure";
import { useMemo, useState } from "react";

const Page = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setContent] = useState<UserData | null>(null);
  const limit = 20;
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = useGetUsers({ limit, page });
  const users = (data as any)?.users as UserData[];
  const assignedCourses = users
    ?.filter((i) => i.role === "educator")
    ?.flatMap((i) => i.courses)
    ?.map((i) => i._id);

  const stats = useMemo(
    () => [
      {
        title: "Total Users",
        value: (data as any)?.totalUsers ?? 0,
        icon: "/attendance.svg",
      },
      {
        title: "Students",
        value: (data as any)?.counts?.students ?? 0,
        icon: "/attendance.svg",
      },
      {
        title: "Educators",
        value: (data as any)?.counts?.educators ?? 0,
        icon: "/attendance.svg",
      },
    ],
    [users]
  );
  return isLoading ? (
    <LoaderContainer />
  ) : (
    <section className="flex flex-col h-full">
      <div className="bg-white border mb-5 border-[#F3F3F3] p-3 lg:p-4 flex flex-col lg:flex-row lg:items-center gap-2 justify-between">
        <div>
          <p className="font-medium">Users</p>
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
          Create User
        </Button>
      </div>

      <table className="mt-3 bg-white w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Role</th>
            <th className="hidden lg:table-cell">Email</th>
            <th className="hidden lg:table-cell">Courses</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.length > 0 &&
            users?.map((i, idx: number) => (
              <UsersTableRow
                key={idx}
                user={i}
                onOpen={(e) => {
                  setContent(e);
                  onOpen();
                }}
              />
            ))}
        </tbody>
      </table>
      {users?.length === 0 && (
        <NotFound
          title="No User Created Yet"
          subtitle="All users would shown here when created"
        />
      )}
      <CreateUserModal
        isOpen={isOpen}
        onClose={() => {
          setContent(null);
          onClose();
        }}
        user={content}
        assignedCourses={assignedCourses}
      />
    </section>
  );
};

export default Page;
