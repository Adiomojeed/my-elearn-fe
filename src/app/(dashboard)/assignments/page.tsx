"use client";

import { AssignmentData, useGetAssignments } from "@/api/assignments";
import AssignmentTableRow from "@/components/dashboard/courses/AssignmentTableRow";
import { LoaderContainer, NotFound } from "@/components/Loader";
import AssignmentModal from "@/components/modals/AssignmentModal";
import useDisclosure from "@/hooks/useDisclosure";
import { assignmentsStats } from "@/utils/counters";
import React, { useMemo, useState } from "react";

const Page = () => {
  const { data, isLoading } = useGetAssignments({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const assignments = data as unknown as AssignmentData[];
  const [assignment, setAssignment] = useState<AssignmentData | null>(null);

  const counts = assignmentsStats(assignments);

  const stats = useMemo(
    () => [
      { status: "submitted", value: counts.submitted },
      { status: "pending", value: counts.pending },
      { status: "overdue", value: counts.overdue },
    ],
    [assignments]
  );

  return isLoading ? (
    <LoaderContainer />
  ) : (
    <section className="flex flex-col h-full">
      <h6 className="md:text-lg font-medium">Assignments</h6>
      <div className="mt-4 border border-[#F3F3F3] bg-white rounded-lg p-4 lg:p-5 lg:flex items-center">
        <div>
          <small className="text-xs text-grey-200">Total Assignments</small>
          <h5 className="text-2xl font-medium leading-[29px] mt-2">
            {assignments?.length ?? 0}
          </h5>
        </div>
        <div className="mt-4 lg:mt-0 lg:ml-auto flex gap-3">
          {stats.map((i, idx) => (
            <div key={idx} className="min-w-[100px]">
              <small className="text-xs text-grey-200 flex items-center gap-2">
                <div
                  className={`w-[10px] h-[10px] rounded-full ${
                    i.status === "pending"
                      ? "bg-[#B58700]"
                      : i.status === "submitted"
                      ? "bg-[#00893F]"
                      : "bg-[#E8382C]"
                  } first-uppercase`}
                />
                {i.status}
              </small>
              <h5 className="text-2xl font-medium leading-[29px] mt-2">
                {i.value}
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
            <th>Grade</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {assignments.length > 0 &&
            assignments?.map((i, idx) => (
              <AssignmentTableRow
                key={idx}
                assignment={i}
                onOpen={() => {
                  onOpen();
                  setAssignment(i);
                }}
              />
            ))}
        </tbody>
      </table>

      <AssignmentModal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setTimeout(() => setAssignment(null), 1000);
        }}
        assignment={assignment as AssignmentData}
      />

      {assignments.length === 0 && (
        <NotFound
          title="No Assignment Yet"
          subtitle="Assignments from courses would shown here when created"
        />
      )}
    </section>
  );
};

export default Page;
