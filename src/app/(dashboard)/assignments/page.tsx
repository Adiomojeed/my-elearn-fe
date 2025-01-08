import Button from "@/components/Button";
import AssignmentTableRow from "@/components/dashboard/courses/AssignmentTableRow";
import React from "react";

const Page = () => {
  const status = "pending";
  return (
    <section className="flex flex-col h-full">
      <h6 className="md:text-lg font-medium">Assignments</h6>
      <div className="mt-4 border border-[#F3F3F3] bg-white rounded-lg p-4 lg:p-5 lg:flex items-center">
        <div>
          <small className="text-xs text-grey-200">Total Assignments</small>
          <h5 className="text-2xl font-medium leading-[29px]">6</h5>
        </div>
        <div className="mt-4 lg:mt-0 lg:ml-auto flex gap-3">
          {Array.from({ length: 3 }).map((i, idx) => (
            <div key={idx} className="min-w-[100px]">
              <small className="text-xs text-grey-200 flex items-center gap-2">
                <div className="w-[10px] h-[10px] rounded-full bg-primary-600" />
                Completed
              </small>
              <h5 className="text-2xl font-medium leading-[29px] mt-[2px]">
                3
              </h5>
            </div>
          ))}
        </div>
      </div>
      <table className="mt-4 lg:mt-6 bg-white">
        <thead>
          <tr>
            <th>Course</th>
            <th>Assignment Title</th>
            <th className="hidden lg:table-cell">Description</th>
            <th className="hidden lg:table-cell">Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((i, idx) => (
            <AssignmentTableRow key={idx} />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Page;
