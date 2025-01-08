"use client";

import { useAppSelector } from "@/store/useAppSelector";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { AssignmentCardProps } from "../AssignmentCard";

const AddAssignmentModal = ({
  isOpen,
  onClose,
  isEdit,
  assignment,
}: {
  isOpen: boolean;
  onClose: () => void;
  isEdit?: boolean;
  assignment?: AssignmentCardProps;
}) => {
  const {
    auth: { user },
  } = useAppSelector((s) => s);
  const role = user?.role;

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
            Assignments /{" "}
            <span className="text-primary-500">
              {isEdit ? "Edit Assignment" : "Upload Assignment"}
            </span>
          </small>
        </div>
        <div className="p-4 md:p-5">
          <form className="flex flex-col gap-4">
            <Input label="Assignment Title" placeholder="Input Title here" />
            <div className="">
              <p className="text-sm">Attach a file</p>
              <div className="mt-3 p-3 bg-white rounded border border-[#F3F3F3] flex items-center gap-4">
                <img src="/attach.svg" alt="attach icon" />
                <div className="">
                  <p className="text-sm font-medium line-clamp-1">
                    Upload a file
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
                <input type="file" name="file" id="file" className="hidden" />
              </div>
            </div>
            <TextArea
              label="Assignment Details"
              placeholder="Assignment Details"
              className="min-h-[400px]"
            />

            <Button type="submit" className="px-6 text-sm w-max" size="md">
              Publish
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAssignmentModal;
