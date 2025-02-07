import Button from "@/components/Button";
import TextArea from "@/components/TextArea";
import ResourceCard from "../dashboard/ResourceCard";
import { SyntheticEvent, useEffect, useState } from "react";
import Input from "../Input";
import {
  invalidateSingleCourse,
  LessonData,
  useCreateLesson,
  useEditLesson,
} from "@/api/course";
import { useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toBase64 } from "@/utils/downloadFile";
import ResourceLoader from "../dashboard/ResourceLoader";

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
  const [title, setTitle] = useState<string>("");
  const { mutate: createLesson, isPending } = useCreateLesson();
  const [file, setFile] = useState<any | null>(null);
  const [fileObj, setFileObj] = useState<File | null>(null);
  const { mutate: editLesson, isPending: editing } = useEditLesson();
  const [openView, setOpenView] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }
  }, [isOpen]);

  const onAnimationEnd = () => {
    if (!shouldRender) {
      onClose();
    }
  };

  const closeModal = () => {
    setShouldRender(false);
    setOpenView(false);
  };

  useEffect(() => {
    setTitle(lesson?.title || "");
    setFile(lesson?.file ?? null);
  }, [lesson]);

  const [error, setError] = useState<boolean>(false);
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (isEdit) {
      editLesson(
        {
          lesson: {
            title,
            file: {
              ...file,
              ...(fileObj && {
                file: await toBase64(fileObj),
                filename: fileObj.name,
              }),
            },
          },
          courseId: id as string,
          moduleId: module,
          lessonId: lesson?._id as string,
        },
        {
          onSuccess: () => invalidateSingleCourse(queryClient),
        }
      );
    } else {
      if (!fileObj) {
        setError(true);
      } else {
        setError(false);
        createLesson(
          {
            lesson: {
              title,
              // @ts-ignore
              file: { filename: fileObj?.name, file: await toBase64(fileObj) },
            },
            courseId: id as string,
            moduleId: module,
          },
          {
            onSuccess: () => invalidateSingleCourse(queryClient, closeModal),
          }
        );
      }
    }
  };

  return (
    <>
      {isOpen && (
        <div
          onClick={closeModal}
          className="absolute left-0 top-0 z-[101] h-screen w-screen bg-black bg-opacity-10"
        ></div>
      )}
      <div
        className={`absolute z-[101] h-full top-0 transition-[right] overflow-y-auto easein duration-[750ms] ${
          shouldRender ? "right-0" : "-right-[100%] md:-right-[500px]"
        } bg-[#F9FAFB] w-full md:max-w-[500px] `}
        onTransitionEnd={onAnimationEnd}
      >
        <div className="bg-white h-20 lg:h-[108px] border-b border-[#F3F3F3] flex items-center px-5 gap-3 sticky top-0">
          <Button
            onClick={closeModal}
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
          <div>
            <div className="mt-3 p-3 lg:p-4 bg-white rounded border border-dashed border-[#F3F3F3] flex items-center gap-4">
              <img src="/attach.svg" alt="attach icon" />
              <div className="">
                <p className="text-sm font-medium line-clamp-1">
                  {fileObj?.name ?? file?.name ?? "Upload a file"}
                </p>
                <small className="text-xs text-grey-200">
                  PDF, PNG, JPG, or XLS{" "}
                  <span className="text-grey-400 font-medium">(Max 15MB)</span>
                </small>
              </div>
              <label
                htmlFor="file"
                className="ml-auto btn-outline px-4 text-xs"
              >
                Attach
              </label>
              <input
                type="file"
                name="file"
                id="file"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files;
                  if (f && f.length > 0) {
                    setFileObj(f[0]);
                  }
                }}
                // required={!isEdit}
              />
            </div>
            {error && (
              <small className="text-red-400 mt-2">
                Select a file to continue
              </small>
            )}
          </div>
          {isEdit && (
            <>
              <Button
                onClick={() => setOpenView(true)}
                type="button"
                className="px-3 text-sm mt-2 w-max"
              >
                View Current Resource
              </Button>

              {openView && (
                <ResourceLoader
                  obj={lesson?.file as any}
                  fullFunc={false}
                  onClose={() => setOpenView(false)}
                />
              )}
            </>
          )}
          <Button
            isLoading={isPending ?? editing}
            type="submit"
            className="px-3 text-sm mt-2 w-max"
          >
            {isEdit ? "Save Changes" : "Add Lesson"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default LessonModal;
