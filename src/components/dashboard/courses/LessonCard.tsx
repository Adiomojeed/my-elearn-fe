import {
  invalidateSingleCourse,
  LessonData,
  useDeleteLesson,
  useEditLesson,
} from "@/api/course";
import Button from "@/components/Button";
import LessonModal from "@/components/modals/LessonModal";
import useDisclosure from "@/hooks/useDisclosure";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";

const LessonCard = ({
  lesson,
  module,
}: {
  lesson?: LessonData;
  module: string;
}) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate: editLesson, isPending: editing } = useEditLesson();
  const { mutate: deleteLesson, isPending: deleting } = useDeleteLesson();
  return (
    <div className="pt-3 md:pt-4 first:pt-0">
      <div className="flex items-center md:grid grid-cols-1 lg:grid-cols-2 gap-3 ">
        {/* <Input placeholder="Lesson title" size="md" className="" /> */}
        <p className="text-sm">{lesson?.title}</p>

        <div className="flex ml-auto gap-3">
          <button onClick={onOpen}>
            <img src="/pen.svg" alt="" />
          </button>
          <Button
            onClick={() => {
              editLesson(
                {
                  lesson: { isVisible: !lesson?.isVisible },
                  courseId: id as string,
                  moduleId: module,
                  lessonId: lesson?._id as string,
                },
                {
                  onSuccess: () => invalidateSingleCourse(queryClient),
                }
              );
            }}
            btnType="outline"
            className="px-4 text-xs"
            size="sm"
            isLoading={editing}
          >
            {lesson?.isVisible ? "Hide" : "Unhide"}
            <span className="hidden md:inline">&nbsp;from students</span>
          </Button>
          <button
            onClick={() => {
              deleteLesson(
                {
                  courseId: id as string,
                  moduleId: module,
                  lessonId: lesson?._id as string,
                },
                {
                  onSuccess: () => invalidateSingleCourse(queryClient),
                }
              );
            }}
          >
            <img src="/trash.svg" alt="" />
          </button>
        </div>
      </div>

      <LessonModal
        isOpen={isOpen}
        onClose={onClose}
        lesson={lesson}
        module={module}
      />
    </div>
  );
};

export default LessonCard;
