"use client";

import randomstring from "randomstring";
import { useAppSelector } from "@/store/useAppSelector";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { AssignmentCardProps } from "../dashboard/AssignmentCard";
import Select, { Select2 } from "../Select";

const CreateUserModel = ({
  isOpen,
  onClose,
  isEdit,
}: {
  isOpen: boolean;
  onClose: () => void;
  isEdit?: boolean;
}) => {
  const {
    auth: { user },
  } = useAppSelector((s) => s);
  const role = user?.role;

  // randomstring.generate({
  //   length: 12,
  //   charset: "alphanumeric",
  // });

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
            User /{" "}
            <span className="text-primary-500">
              {isEdit ? "Edit User" : "Create User"}
            </span>
          </small>
        </div>
        <div className="p-4 md:p-5">
          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="First Name" />
              <Input label="Last Name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Account ID" />
              <Select label="Last Name">
                <option value="student">Student</option>
                <option value="educator">Educator</option>
                <option value="admin">Adminstrator</option>
              </Select>
            </div>
            <Input label="Email Address" type="email" />
            <Select2
              label="Courses"
              value={[]}
              options={[
                { label: "1", value: "1" },
                { label: "2", value: "2" },
              ]}
              onChange={() => {}}
              id="courses"
            />

            <Button type="submit" className="px-6 text-sm w-max" size="md">
              {isEdit ? "Save" : "Create"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateUserModel;
