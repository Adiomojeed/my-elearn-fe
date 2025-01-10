"use client";

import Button from "@/components/Button";
import useDisclosure from "@/hooks/useDisclosure";
import { UserData } from "@/api/auth";
import CreateUserModal from "@/components/modals/CreateUserModal";
import CreateCourseModel from "@/components/modals/CreateCourseModal";

const CourseTableRow = ({ user }: { user?: UserData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <tr className="user-row">
        <td className="max-w-[80px] md:max-w-[initial]">{user?.account_id}</td>
        <td className="max-w-[140px] md:max-w-[initial]">
          {user?.firstname} {user?.lastname}
        </td>
        <td className="hidden lg:table-cell">{user?.email}</td>
        <td className="hidden lg:table-cell">{user?.courses.length}</td>
        <td>{user?.role}</td>
        <td>
          <Button onClick={onOpen} btnType="outline" size="sm" className="px-4">
            View
          </Button>
        </td>
      </tr>
      <CreateCourseModel isEdit isOpen={isOpen} onClose={onClose} user={user} />
    </>
  );
};

export default CourseTableRow;
