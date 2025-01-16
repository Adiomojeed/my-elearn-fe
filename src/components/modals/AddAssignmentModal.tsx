"use client";

import { useAppSelector } from "@/store/useAppSelector";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import {
  AssignmentData,
  useCreateAssignment,
  useUpdateAssignment,
} from "@/api/assignments";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import moment from "moment";
import handleDownload, { toBase64 } from "@/utils/downloadFile";

const AddAssignmentModal = ({
  isOpen,
  onClose,
  assignment,
}: {
  isOpen: boolean;
  onClose: () => void;
  assignment?: AssignmentData;
}) => {
  const ref = useRef(null);
  const isEdit = !!assignment;

  const { id } = useParams();

  const [status, setStatus] = useState<boolean>(false);

  const [state, setState] = useState({
    title: "",
    description: "",
    dueDate: moment(new Date()).format("yyyy-MM-DD"),
  });

  const handleChange = (e: any) => {
    setState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const [file, setFile] = useState<any | null>(null);
  const [fileObj, setFileObj] = useState<File | null>(null);

  useEffect(() => {
    setState({
      title: assignment?.title ?? "",
      description: assignment?.description ?? "",
      dueDate: moment(assignment?.dueDate ?? new Date()).format("yyyy-MM-DD"),
    });
    setFile(assignment?.file ?? null);

    setStatus(assignment?.isVisible ?? false);
  }, [assignment]);

  const { mutate: createAssignment, isPending } = useCreateAssignment();
  const { mutate: updateAssignment, isPending: updating } =
    useUpdateAssignment();
  const queryClient = useQueryClient();
  const onSuccess = () => {
    onClose();
    queryClient.invalidateQueries({
      queryKey: [isEdit ? "getSingleAssignment" : "getAssignments"],
    });
    setState({
      title: "",
      description: "",
      dueDate: moment(new Date()).format("yyyy-MM-DD"),
    });
    setFile(null);
    setFileObj(null);
  };

  const [error, setError] = useState<boolean>(false);
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!isEdit) {
      if (!fileObj) {
        setError(true);
      } else {
        setError(false);
        createAssignment(
          {
            ...state,
            file: {
              filename: fileObj?.name,
              file: (await toBase64(fileObj)) as string,
            },
            courseId: id as string,
          },
          { onSuccess }
        );
      }
    } else {
      updateAssignment(
        {
          assId: assignment?._id as string,
          assignment: {
            ...state,
            file: {
              ...file,
              ...(fileObj && {
                file: await toBase64(fileObj),
                filename: fileObj.name,
              }),
            },
            isVisible: status,
          },
        },
        { onSuccess }
      );
    }
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
        } bg-[#F9FAFB] w-full md:max-w-[500px] lg:max-w-[514px] overflow-y-auto transition-[right] easein duration-[750ms]`}
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
            Assignments /{" "}
            <span className="text-primary-500">
              {isEdit ? "Edit Assignment" : "Upload Assignment"}
            </span>
          </small>
        </div>
        <div className="p-4 md:p-5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Assignment Title"
              placeholder="Input Title here"
              value={state.title}
              id="title"
              onChange={(e) => handleChange(e)}
              required
            />
            <Input
              label="Submission Due date"
              type="date"
              // placeholder="Input Title here"
              // @ts-ignore
              value={state.dueDate}
              id="dueDate"
              onChange={(e) => handleChange(e)}
              required
              min={moment(new Date()).format("yyyy-MM-DD")}
            />
            <div className="">
              <p className="text-sm">Attach a file</p>
              <div className="mt-3 p-3 bg-white rounded border border-[#F3F3F3] flex items-center gap-4">
                <img src="/attach.svg" alt="attach icon" />
                <div className="">
                  <p className="text-sm font-medium line-clamp-1">
                    {fileObj?.name ?? file?.name ?? "Upload a file"}
                  </p>
                  <small className="text-xs text-grey-200">
                    PDF, PNG, JPG, or XLS{" "}
                    <span className="text-grey-400 font-medium">
                      (Max 15MB)
                    </span>
                  </small>
                </div>
                <label htmlFor="file" className="ml-auto btn-outline px-4">
                  Attach
                </label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="hidden"
                  ref={ref}
                  onChange={(e) => {
                    const f = e.target.files;
                    if (f && f.length > 0) {
                      setFileObj(f[0]);
                      if (ref.current) {
                        (ref.current as HTMLInputElement).value = "";
                      }
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
            {isEdit && (
              <Button
                onClick={() =>
                  handleDownload(
                    assignment?.file?.url as string,
                    assignment?.file?.name as string
                  )
                }
                type="button"
                className="px-3 text-sm mt-2 w-max"
              >
                View Current Resource
              </Button>
            )}
            </div>
            <TextArea
              label="Assignment Details"
              placeholder="Assignment Details"
              className="min-h-[400px]"
              value={state.description}
              id="description"
              onChange={(e) => handleChange(e)}
              required
            />
            {isEdit && (
              <p className="flex items-center gap-5 text-sm text-grey-500">
                Make assignment open to students{" "}
                <input
                  type="checkbox"
                  checked={status}
                  onChange={() => setStatus(!status)}
                />
              </p>
            )}
            <Button
              isLoading={isPending ?? updating}
              type="submit"
              className="px-6 text-sm w-max"
              size="md"
            >
              {isEdit ? "Edit" : "Create"} Assignmet
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAssignmentModal;
