"use client";

import { SyntheticEvent, useState } from "react";
import { useLoginUser } from "@/api/auth";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { mutate: loginUser, isPending, error } = useLoginUser();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    loginUser({ email, password });
  };

  return (
    <>
      <p className="lg:text-lg">Welcome back</p>
      <h6 className="text-xl md:text-2xl font-semibold mt-1">
        Sign into your account
      </h6>
      <form
        onSubmit={handleSubmit}
        className="mt-4 md:mt-5 flex flex-col gap-2 md:gap-4"
      >
        <Input
          label="Email Address"
          type="email"
          id="email"
          placeholder="Johndoe@gmail.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>
          <Input
            label="Password"
            type="password"
            id="password"
            placeholder="**********"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <p className="text-sm text-red-400 my-2">
              Email or password incorrect
            </p>
          )}
          <Link
            href="/"
            className="text-sm md:text-base font-semibold text-accent-500 block mt-2"
          >
            Forgot password?
          </Link>
        </div>
        <Button
          isLoading={isPending}
          size="lg"
          type="submit"
          className="font-normal px-6 gap-3"
        >
          Sign in
          <Image src="/arrow-right.svg" width={18} height={14.4} alt="" />
        </Button>
        <p className="text-sm md:text-base text-center">
          I don’t have an account?{" "}
          <Link href="/sign-up" className="text-accent-500 underline">
            Create an account
          </Link>{" "}
        </p>
      </form>
    </>
  );
};

export default Page;
