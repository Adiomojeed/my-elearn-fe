"use client";

import Button from "@/components/Button";
import { UserData } from "@/api/auth";

const UsersTableRow = ({
  user,
  onOpen,
}: {
  user?: UserData;
  onOpen: (e: UserData) => void;
}) => {
  return (
    <>
      <tr className="user-row">
        <td className="max-w-[80px] md:max-w-[initial]">{user?.account_id}</td>
        <td className="max-w-[140px] md:max-w-[initial]">
          {user?.firstname} {user?.lastname}
        </td>
        <td className="first-uppercase">{user?.role}</td>
        <td className="hidden lg:table-cell">{user?.email}</td>
        <td className="hidden lg:table-cell">{user?.courses.length}</td>
        <td>
          <Button
            onClick={() => user && onOpen(user)}
            btnType="outline"
            size="sm"
            className="px-4"
          >
            View
          </Button>
        </td>
      </tr>
    </>
  );
};

export default UsersTableRow;
