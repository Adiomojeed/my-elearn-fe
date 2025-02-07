import {
  invalidateSingleCourse,
  LessonData,
  ModuleData,
  useDeleteModule,
  useEditModule,
} from "@/api/course";
import Accordion from "@/components/Accordion";
import Button, { IconLoad } from "@/components/Button";
import Input from "@/components/Input";
import { SyntheticEvent, useEffect, useState } from "react";
import LessonCard from "./LessonCard";
import LessonModal from "@/components/modals/LessonModal";
import useDisclosure from "@/hooks/useDisclosure";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const ModuleCard = ({ module, id }: { module: ModuleData; id: number }) => {
  const queryClient = useQueryClient();
  const { id: courseId } = useParams();
  const [title, setTitle] = useState(module?.title);
  const [lesson, setLesson] = useState<LessonData | null>();
  useEffect(() => {
    setTitle(module?.title);
  }, [module]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate: editModule, isPending: editing } = useEditModule();
  const { mutate: deleteModule, isPending: deleting } = useDeleteModule();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    editModule(
      {
        module: { title },
        courseId: courseId as string,
        moduleId: module?._id as string,
      },
      {
        onSuccess: () => invalidateSingleCourse(queryClient),
      }
    );
  };

  return (
    <>
      <Accordion
        className="rounded-lg bg-white border border-[#F3F3F3]"
        titleClassName="border-b border-[#F3F3F3]"
        title={
          <div className="flex w-full items-center gap-4 justifybetween">
            <small className="font-medium">
              Module {id} : {title}{" "}
              {!module?.isVisible && (
                <span
                  className={`text-[10px] px-2 py-1 font-normal rounded-[10px] w-min first-uppercase text-[#00893F] bg-[#E6F9EE]`}
                >
                  Hidden
                </span>
              )}
            </small>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                editModule(
                  {
                    module: { isVisible: !module?.isVisible },
                    courseId: courseId as string,
                    moduleId: module?._id as string,
                  },
                  {
                    onSuccess: () => invalidateSingleCourse(queryClient),
                  }
                );
              }}
              className="px-4 text-xs mr2 ml-auto"
              size="sm"
              isLoading={editing}
            >
              {module?.isVisible ? "Hide" : "Show"}
              <span className="hidden md:inline">
                &nbsp;{module?.isVisible ? "from" : "to"} students
              </span>
            </Button>
            <button
              className="mr-2 flex-center"
              onClick={(e) => {
                e.stopPropagation();
                deleteModule(
                  {
                    courseId: courseId as string,
                    moduleId: module?._id as string,
                  },
                  {
                    onSuccess: () => invalidateSingleCourse(queryClient),
                  }
                );
              }}
            >
              {deleting ? (
                <div className="px-4 flex-center">
                  <IconLoad />
                </div>
              ) : (
                <img src="/trash.svg" alt="" />
              )}
            </button>
          </div>
        }
        content={
          <div className="p-3 md:p-4 lg:px-12 ">
            <div className="flex flex-col divide-y divide-[#F3F3F3] gap-3 lg:gap-3">
              <form onSubmit={handleSubmit} className="flex items-end gap-3">
                <Input
                  label="Module Title"
                  placeholder="Module title"
                  size="md"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-[250px] md:w-[300px]"
                  required
                />
                <Button
                  type="submit"
                  className="px-4 text-xs "
                  size="sm"
                  isLoading={editing}
                >
                  Save
                </Button>
              </form>
              {module?.lessons?.map((i, idx) => (
                <LessonCard
                  key={idx}
                  lesson={i}
                  module={module?._id as string}
                  onOpen={() => {
                    onOpen();
                    setLesson(i);
                  }}
                />
              ))}
              <Button
                type="submit"
                className="px-4 text-sm mt3 ml-auto w-max"
                size="md"
                onClick={onOpen}
              >
                Add new lesson
              </Button>
            </div>
          </div>
        }
      />
      {isOpen && (
        <LessonModal
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setLesson(null);
          }}
          module={module?._id as string}
          lesson={lesson as LessonData}
        />
      )}
    </>
  );
};

export default ModuleCard;
