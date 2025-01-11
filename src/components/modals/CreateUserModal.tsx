"use client";

import randomstring from "randomstring";
import { useAppSelector } from "@/store/useAppSelector";
import { SyntheticEvent, useEffect, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Select, { Select2 } from "../Select";
import { useCreateUser, UserData } from "@/api/auth";
import { createPortal } from "react-dom";

const CreateUserModal = ({
  isOpen,
  onClose,
  user,
}: {
  isOpen: boolean;
  onClose: () => void;
  user?: UserData | null;
}) => {
  const isEdit = !!user;
  const [state, setState] = useState({
    account_id: "",
    email: "",
    firstname: "",
    lastname: "",
    role: "",
  });

  useEffect(() => {
    setState({
      account_id: user?.account_id ?? "",
      email: user?.email ?? "",
      firstname: user?.firstname ?? "",
      lastname: user?.lastname ?? "",
      role: user?.role ?? "",
    });
  }, [user]);

  const handleChange = (e: any) => {
    setState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const { mutate: createUser, isPending } = useCreateUser();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const password = randomstring.generate({
      length: 12,
      charset: "alphanumeric",
    });
    createUser(
      { ...state, password },
      {
        onSuccess: () => {
          onClose();
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
    </>,
    document.body
  );
};

export default CreateUserModal;
