import Button from "@/components/Button";
import TextArea from "@/components/TextArea";
import ResourceCard from "../dashboard/ResourceCard";
import { SyntheticEvent, useState } from "react";
import Input from "../Input";
import {
  invalidateSingleCourse,
  LessonData,
  useCreateLesson,
  useEditLesson,
} from "@/api/course";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const LessonModal = ({
  isOpen,
  onClose,
  lesson,
  module,
}: {
  isOpen: boolean;
  onClose: () => void;
  lesson?: LessonData;
  module: string;
}) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const isEdit = !!lesson;
  const [title, setTitle] = useState<string>(lesson?.title || "");
  const { mutate: createLesson, isPending } = useCreateLesson();
  const { mutate: editLesson, isPending: editing } = useEditLesson();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    isEdit
      ? editLesson(
          {
            lesson: { title },
            courseId: id as string,
            moduleId: module,
            lessonId: lesson?._id as string,
          },
          {
            onSuccess: () => invalidateSingleCourse(queryClient),
          }
        )
      : createLesson(
          {
            lesson: {
              title,
              file: { name: "file-name-dsjhdhsja.pdf", url: "url" },
            },
            courseId: id as string,
            moduleId: module,
          },
          {
            onSuccess: () => invalidateSingleCourse(queryClient, onClose),
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
          isOpen ? "right-0" : "-right-[100%] md:-right-[500px]"
        } bg-[#F9FAFB] w-full md:max-w-[500px] transition-[right] overflow-y-auto easein duration-[750ms]`}
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
            {isEdit ? "Edit" : "Add"} Lesson
          </small>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-4 md:p-5 flex flex-col gap-3"
        >
          <Input
            label="Lesson Title"
            placeholder="Lesson title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=""
            required
          />
          <div className="mt-3 p-3 lg:p-4 bg-white rounded border border-dashed border-[#F3F3F3] flex items-center gap-4">
            <img src="/attach.svg" alt="attach icon" />
            <div className="">
              <p className="text-sm font-medium line-clamp-1">Upload a file</p>
              <small className="text-xs text-grey-200">
                PDF, PNG, JPG, or XLS{" "}
                <span className="text-grey-400 font-medium">(Max 15MB)</span>
              </small>
            </div>
            <label htmlFor="file" className="ml-auto btn-outline px-4 text-xs">
              Attach
            </label>
            <input type="file" name="file" id="file" className="hidden" />
          </div>
          <Button
            isLoading={isPending}
            type="submit"
            className="px-3 text-sm mt-2 w-max"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </>
  );
};

export default LessonModal;
