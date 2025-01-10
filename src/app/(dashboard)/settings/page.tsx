"use client";

import { useUpdatePassword, useUpdateUser } from "@/api/user";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useAppSelector } from "@/store/useAppSelector";
import { SyntheticEvent, useEffect, useState } from "react";

const Page = () => {
  const {
    auth: { user },
  } = useAppSelector((s) => s);

  const role = user?.role;
  const [state, setState] = useState({
    account_id: "",
    email: "",
    firstname: "",
    lastname: "",
    role: "",
  });

  const [old_password, setPassword] = useState("");
  const [new_password, setNPassword] = useState("");

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
    setState((prev: any) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const { mutate: updateUser, isPending } = useUpdateUser();
  const { mutate: updatePassword, isPending: isChangePassword } =
    useUpdatePassword();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // @ts-ignore
    updateUser(state);
  };

  const handleChangePassword = (e: SyntheticEvent) => {
    e.preventDefault();
    updatePassword(
      { old_password, new_password },
      {
        onSuccess: () => {
          setPassword("");
          setNPassword("");
        },
      }
    );
  };

  return (
    <section className="flex flex-col h-full">
      <h6 className="md:text-lg font-medium">Settings</h6>
      <div className="mt-4 lg:mt-6 flex flex-col divide-y divide-[#F0F2F5] gap-8 lg:gap-12">
        <div className="md:flex gap-4">
          <div className="lg:w-2/5 max-w-[300px]">
            <p className="font-medium">Profile photo</p>
            <small className="mt-1 text-grey-200">
              This image will be displayed on your profile
            </small>
          </div>
          <div className="lg:w-3/5 mt-4 md:mt-0">
            <img
              src={role === "student" ? "/avatar.svg" : "/avatar-l.svg"}
              className="w-[120px] h-[120px]"
              alt="avatar icon"
            />
          </div>
        </div>
        <div className="lg:flex gap-4 pt-8 lg:pt-12">
          <div className="lg:w-2/5 max-w-[300px]">
            <p className="font-medium">Personal Information</p>
            <small className="mt-1 text-grey-200">
              Update your personal details here
            </small>
          </div>
          <form
            onSubmit={handleSubmit}
            className="lg:w-3/5 flex flex-col gap-5 mt-4 lg:mt-0"
          >
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
            <Input
              label={`${role} Number`}
              value={state.account_id}
              disabled={!!user}
            />
            <Input
              label="Email address"
              value={state.email}
              disabled={!!user}
            />
            <Button isLoading={isPending} type="submit" className="w-max">
              Save Changes
            </Button>
          </form>
        </div>
        <div className="lg:flex gap-4 pt-8 lg:pt-12">
          <div className="lg:w-2/5 max-w-[300px]">
            <p className="font-medium">Manage Password</p>
            <small className="mt-1 text-grey-200">Keep your account safe</small>
          </div>
          <form
            onSubmit={handleChangePassword}
            className="lg:w-3/5 flex flex-col gap-5 mt-4 lg:mt-0"
          >
            <Input
              label="Old Password"
              type="password"
              value={old_password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Input
              label="New Password"
              type="password"
              value={new_password}
              onChange={(e) => setNPassword(e.target.value)}
              required
            />
            <Button
              isLoading={isChangePassword}
              type="submit"
              className="w-max"
            >
              Save Changes
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Page;
