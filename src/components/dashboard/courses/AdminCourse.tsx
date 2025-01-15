import Button from "@/components/Button";
import Input from "@/components/Input";
import ModuleCard from "./ModuleCard";
import { CourseData, useCreateModule, useUpdateCourse } from "@/api/course";
import { useState } from "react";
import { numbers } from "@/utils/numbers";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderContainer } from "@/components/Loader";

const AdminCourse = ({ course }: { course: CourseData }) => {
  const { mutate: createModule, isPending } = useCreateModule();

  const queryClient = useQueryClient();
  const onSuccess = () =>
    queryClient.invalidateQueries({
      queryKey: ["getSingleCourse"],
    });
  const { mutate: updateCourse, isPending: updating } = useUpdateCourse();
  return !course ? (
    <LoaderContainer />
  ) : (
    <div className="mt-4 flex flex-col gap-3 lg:gap-4 xl:max-w-[75%] pb-8">
      <div className="bg-white border border-[#F3F3F3] p-4 lg:py-5 lg:px-6 flex flex-col lg:flex-row lg:items-center justify-between">
        <div>
          <h5 className="text-lg lg:text-2xl font-medium">
            {course?.code} - {course?.title}
          </h5>
          <p className="text-sm text-grey-300">
            This contains everything you need about the course?.
          </p>
        </div>
        <div className="flex gap-3">
          {/* <Button
            type="submit"
            btnType="outline"
            className="px-4 text-sm mt-2 md:mt-0 w-max"
            size="md"
          >
            Save Changes
          </Button> */}
          <Button
            type="submit"
            className="px-4 text-sm mt-2 md:mt-0 w-max"
            size="md"
            isLoading={updating}
            onClick={() => {
              updateCourse(
                {
                  courseId: course?._id as string,
                  // @ts-ignore
                  course: { isActive: !course?.isActive },
                },
                {
                  onSuccess,
                }
              );
            }}
          >
            {course?.isActive ? "Disable" : "Enable"} Course
          </Button>
        </div>
      </div>

      {course?.modules?.map((i, idx) => (
        <ModuleCard key={idx} module={i} id={idx + 1} />
      ))}

      <Button
        type="submit"
        btnType="outline"
        className="px-4 text-sm"
        size="md"
        isLoading={isPending}
        onClick={() => {
          if (course?._id) {
            createModule(
              {
                courseId: course?._id,
                module: {
                  title: `Module ${
                    numbers[
                      (course?.modules?.length + 1) as keyof typeof numbers
                    ]
                  }`,
                },
              },
              {
                onSuccess,
              }
            );
          }
        }}
      >
        Add New Module
      </Button>
    </div>
  );
};

export default AdminCourse;
