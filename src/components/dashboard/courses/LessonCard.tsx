import {
  invalidateSingleCourse,
  LessonData,
  useDeleteLesson,
  useEditLesson,
} from "@/api/course";
import Button from "@/components/Button";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const LessonCard = ({
  lesson,
  module,
  onOpen,
}: {
  lesson?: LessonData;
  module: string;
  onOpen?: () => void;
}) => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { mutate: editLesson, isPending: editing } = useEditLesson();
  const { mutate: deleteLesson, isPending: deleting } = useDeleteLesson();
  return (
    <div className="pt-3 md:pt-4 first:pt-0">
      <div className="flex items-center md:grid grid-cols-1 lg:grid-cols-2 gap-3 ">
        {/* <Input placeholder="Lesson title" size="md" className="" /> */}
        <p className="text-sm">
          {lesson?.title}{" "}
          {!lesson?.isVisible && (
            <span
              className={`text-[10px] px-2 py-1 font-normal rounded-[10px] w-min first-uppercase text-[#00893F] bg-[#E6F9EE]`}
            >
              Hidden
            </span>
          )}
        </p>

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
            {lesson?.isVisible ? "Hide" : "Show"}
            <span className="hidden md:inline">
              &nbsp;{lesson?.isVisible ? "from" : "to"} students
            </span>
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
    </div>
  );
};

export default LessonCard;
