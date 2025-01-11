"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { CourseData } from "@/api/course";
import TextArea from "../TextArea";
import { useCreateCourse } from "@/api/admin";
import { useQueryClient } from "@tanstack/react-query";

const CreateCourseModal = ({
  isOpen,
  onClose,

  course,
}: {
  isOpen: boolean;
  onClose: () => void;
  course?: CourseData | null;
}) => {
  const queryClient = useQueryClient();
  const isEdit = !!course;
  const [state, setState] = useState({
    code: "",
    title: "",
    description: "",
  });

  const [status, setStatus] = useState<boolean>(false);

  useEffect(() => {
    setState({
      code: course?.code ?? "",
      title: course?.title ?? "",
      description: course?.description ?? "",
    });
    setStatus(course?.isActive ?? false);
  }, [course]);

  const handleChange = (e: any) => {
    setState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const { mutate: createCourse, isPending } = useCreateCourse();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    createCourse(
      { ...state },
      {
        onSuccess: () => {
          onClose();
          queryClient.invalidateQueries({ queryKey: ["getAdminCourses"] });
          setState({
            code: "",
            title: "",
            description: "",
          });
          setStatus(false);
        },
      }
    );
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="absolute left-0 top-0 z-[101] h-screen w-screen bg-black bg-opacity-10"
        ></div>
      )}
      <div
        className={`absolute z-[101] h-full top-0 ${
          isOpen
            ? "right-0"
            : "-right-[100%] md:-right-[500px] lg:-right-[514px]"
        } bg-[#F9FAFB] w-full md:max-w-[500px] lg:max-w-[514px] transition-[right] easein duration-[750ms]`}
      >
        <div className="bg-white h-20 lg:h-[108px] border-b border-[#F3F3F3] flex items-center px-5 gap-3 sticky top-0">
          <Button
            onClick={onClose}
            size="sm"
            btnType="outline"
            className="px-3 !border-[#F3F3F3]"
          >
            <img src="/arrow-back.svg" alt="arrow-back icon" />
          </Button>
          <small className="text-grey-300 line-clamp-1">
            Course /{" "}
            <span className="text-primary-500">
              {isEdit ? "Edit Course" : "Create Course"}
            </span>
          </small>
        </div>
        <div className="p-4 md:p-5">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              label="Course Code"
              value={state.code}
              id="code"
              onChange={(e) => handleChange(e)}
              required
              disabled={!!course}
            />

            <Input
              label="Course Name"
              value={state.title}
              id="title"
              onChange={(e) => handleChange(e)}
              required
            />
            <TextArea
              label="Description"
              value={state.description}
              id="description"
              onChange={(e) => handleChange(e)}
              required
            />
            <p className="flex items-center gap-5 text-sm text-grey-500">
              Course active status{" "}
              <input
                type="checkbox"
                checked={status}
                onChange={() => setStatus(!status)}
              />
            </p>
            {/* <Input
              label="Email Address"
              type="email"
              value={state.email}
              id="email"
              onChange={(e) => handleChange(e)}
              required
              disabled={!!user}
            /> */}
            {/* <Select2
              label="Courses"
              value={[]}
              options={[
                { label: "1", value: "1" },
                { label: "2", value: "2" },
              ]}
              onChange={() => {}}
              id="courses"
            /> */}

            <Button
              isLoading={isPending}
              type="submit"
              className="px-6 text-sm w-max"
              size="md"
            >
              {isEdit ? "Save" : "Create"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateCourseModal;
