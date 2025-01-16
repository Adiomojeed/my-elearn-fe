"use client";

import randomstring from "randomstring";
import { useAppSelector } from "@/store/useAppSelector";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Select, { Select2 } from "../Select";
import {
  useAssignCoursesToUser,
  useCreateBulkUsers,
  useCreateUser,
  UserData,
} from "@/api/auth";
import { createPortal } from "react-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useGetAdminCourses } from "@/api/admin";
import { CourseData } from "@/api/course";
import { Option } from "react-multi-select-component";

const CreateUserModal = ({
  isOpen,
  onClose,
  user,
  assignedCourses,
}: {
  isOpen: boolean;
  onClose: () => void;
  user?: UserData | null;
  assignedCourses?: string[];
}) => {
  const queryClient = useQueryClient();
  const isEdit = !!user;
  const [state, setState] = useState({
    account_id: "",
    email: "",
    firstname: "",
    lastname: "",
    role: "student",
  });
  const [coursesArr, setCourses] = useState<Option[] | []>([]);
  const [coursesToMap, setCoursesToMap] = useState<Option[] | []>([]);

  const { data, isLoading } = useGetAdminCourses({ limit: 1000, page: 1 });
  const courses = (data as any)?.courses as CourseData[];

  useEffect(() => {
    setState({
      account_id: user?.account_id ?? "",
      email: user?.email ?? "",
      firstname: user?.firstname ?? "",
      lastname: user?.lastname ?? "",
      role: user?.role ?? "student",
    });
    const cs = user?.courses?.map((i, idx) => ({
      label: i.title,
      value: i._id,
    }));
    setCourses(cs ?? []);
    setCoursesToMap(
      user?.role === "educator"
        ? [
            ...user?.courses?.map((i, idx) => ({
              label: i.title,
              value: i._id,
            })),
            ...courses
              ?.filter(
                (course) =>
                  course?._id && !assignedCourses?.includes(course._id)
              )
              .map((i) => ({
                label: i.title,
                value: i._id,
              })),
          ]
        : courses?.map((i) => ({
            label: i.title,
            value: i._id,
          }))
    );
  }, [user]);

  const handleChange = (e: any) => {
    setState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const { mutate: createUser, isPending } = useCreateUser();
  const { mutate: assignCoursesToUser, isPending: isAssigning } =
    useAssignCoursesToUser();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const password = randomstring.generate({
      length: 12,
      charset: "alphanumeric",
    });
    createUser(
      { ...state, role: state.role ?? "student", password },
      {
        onSuccess: () => {
          onClose();
          queryClient.invalidateQueries({ queryKey: ["getUsers"] });
          setState({
            account_id: "",
            email: "",
            firstname: "",
            lastname: "",
            role: "",
          });
        },
      }
    );
  };

  const handleAssignCourse = (e: SyntheticEvent) => {
    e.preventDefault();

    assignCoursesToUser(
      // @ts-ignore
      { userId: user?._id, courseIds: coursesArr.map((i) => i.value) },
      {
        onSuccess: () => {
          onClose();
          queryClient.invalidateQueries({ queryKey: ["getUsers"] });
          setCourses([]);
        },
      }
    );
  };

  const [file, setFile] = useState(null);

  const ref = useRef(null);
  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
    if (ref.current) {
      (ref.current as HTMLInputElement).value = "";
    }
  };

  const { mutate: createBulkUsers, isPending: uploading } =
    useCreateBulkUsers();
  const [error, setError] = useState<boolean>(false);

  const handleUpload = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!file) {
      setError(true);
    } else {
      setError(false);
      setFile(null);
      const formData = new FormData();
      formData.append("file", file);
      createBulkUsers(formData, {
        onSuccess: () => {
          onClose();
          queryClient.invalidateQueries({ queryKey: ["getUsers"] });
        },
      });
    }
  };

  return createPortal(
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
            User /{" "}
            <span className="text-primary-500">
              {isEdit ? "Edit User" : "Create User"}
            </span>
          </small>
        </div>
        <div className="p-4 md:p-5">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                value={state.firstname}
                id="firstname"
                onChange={(e) => handleChange(e)}
                required
              />
              <Input
                label="Last Name"
                value={state.lastname}
                id="lastname"
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Account ID"
                value={state.account_id}
                id="account_id"
                onChange={(e) => handleChange(e)}
                required
                disabled={!!user}
              />
              <Select
                label="Account Role"
                value={state.role}
                id="role"
                onChange={(e) => handleChange(e)}
                required
                disabled={!!user}
              >
                <option value="student">Student</option>
                <option value="educator">Educator</option>
                <option value="admin">Adminstrator</option>
              </Select>
            </div>
            <Input
              label="Email Address"
              type="email"
              value={state.email}
              id="email"
              onChange={(e) => handleChange(e)}
              required
              disabled={!!user}
            />

            <Button
              isLoading={isPending}
              type="submit"
              className="px-6 text-sm w-max"
              size="md"
            >
              {isEdit ? "Save" : "Create"}
            </Button>
          </form>
          {user?.role !== "admin" && isEdit && (
            <form
              onSubmit={handleAssignCourse}
              className="mt-4 flex flex-col gap-4"
            >
              <h6 className="test-sm lg:text-base font-medium">
                Assign Courses
              </h6>
              <Select2
                label="Courses"
                value={coursesArr}
                options={(coursesToMap ?? [])?.map((i, idx) => ({
                  label: (i as any)?.label,
                  value: (i as any)?.value,
                }))}
                onChange={setCourses}
                id="courses"
              />
              <Button
                isLoading={isAssigning}
                type="submit"
                className="px-6 text-sm w-max"
                size="md"
              >
                Assign Courses
              </Button>
            </form>
          )}
          {!isEdit && (
            <form
              className="mt-6 flex flex-col gap-4 border-t pt-4"
              onSubmit={handleUpload}
            >
              <h6 className="test-sm lg:text-base font-medium">
                Bulk User Creation
              </h6>
              <div className="p-3 lg:p-4 bg-white rounded border border-dashed border-[#F3F3F3] flex items-center gap-4">
                <img src="/attach.svg" alt="attach icon" />
                <div className="">
                  <p className="text-sm font-medium line-clamp-1">
                    {(file as any)?.name ?? "Upload a file"}
                  </p>
                  <small className="text-xs text-grey-200">
                    CSV or XLSX{" "}
                    <span className="text-grey-400 font-medium">
                      (Max 15MB)
                    </span>
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
                  accept=".csv,.xlsx"
                  className="hidden"
                  onChange={handleFileChange}
                  // @ts-ignore
                  ref={ref}
                />
              </div>
              {error && (
                <small className="text-red-400 -mt-2">
                  Select a file to continue
                </small>
              )}

              <Button
                isLoading={uploading}
                type="submit"
                className="px-6 text-sm w-max"
                size="md"
              >
                Create Users
              </Button>
            </form>
          )}
        </div>
      </div>
    </>,
    document.body
  );
};

export default CreateUserModal;
