"use client";

import { SyntheticEvent, useState } from "react";
import { useResetPassword } from "@/api/auth";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [password, setPassword] = useState<string>("");

  const { mutate: resetPassword, isPending } = useResetPassword();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    resetPassword({ password, token });
  };

  return (
    <>
      <h1 className="text-[34px] leading-[1.3em] lg:text-[42px] lg:leading-[55px] font-medium">
        Reset Password
      </h1>
      <p className="text-grey-300 mt-3">Enter your New password</p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 lg:mt-[52px] flex flex-col gap-2 md:gap-4 lg:gap-5"
      >
        <Input
          label="New Password"
          type="password"
          id="email"
          placeholder="**********"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button isLoading={isPending} size="lg" type="submit">
          Reset Password
        </Button>
      </form>
    </>
  );
};

export default Page;
