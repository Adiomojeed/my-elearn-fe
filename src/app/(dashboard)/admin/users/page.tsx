"use client";

import Button from "@/components/Button";
import CreateUserModel from "@/components/modals/CreateUserModel";
import useDisclosure from "@/hooks/useDisclosure";

const Page = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <section className="flex flex-col h-full">
      <div className="bg-white border mb-5 border-[#F3F3F3] p-3 lg:p-4 flex items-center gap-2 justify-between">
        <p className="font-medium">Users</p>
        <Button
          onClick={onOpen}
          type="submit"
          className="px-4 text-sm"
          size="md"
        >
          Create User
        </Button>
        <CreateUserModel isOpen={isOpen} onClose={onClose} />
      </div>

      <table className="mt-3 bg-white w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student Name</th>
            <th className="hidden lg:table-cell">Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* {Array.from({ length: 5 }).map((i, idx) => (
            <AssignmentDetailsTableRow key={idx} />
          ))} */}
        </tbody>
      </table>
    </section>
  );
};

export default Page;
