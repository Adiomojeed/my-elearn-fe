"use client";

import { SyntheticEvent, useState } from "react";
import { useForgotPassword } from "@/api/auth";
import Button from "@/components/Button";
import Input from "@/components/Input";
const Page = () => {
  const [email, setEmail] = useState<string>("");

  const { mutate: forgotPassword, isPending } = useForgotPassword();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    forgotPassword(email);
  };

  return (
    <>
      <h1 className="text-[34px] leading-[1.3em] lg:text-[42px] lg:leading-[55px] font-medium">
        Forgot Password
      </h1>
      <p className="text-grey-300 mt-3">
        Enter your email address to receive a reset link
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 lg:mt-[52px] flex flex-col gap-2 md:gap-4 lg:gap-5"
      >
        <Input
          label="Email Address"
          id="email"
          placeholder="user@myelearn.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button isLoading={isPending} size="lg" type="submit">
          Forgot Password
        </Button>
      </form>
    </>
  );
};

export default Page;
