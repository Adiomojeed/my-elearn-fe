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
      <h1 className="text-[34px] leading-[1.3em] lg:text-[42px] lg:leading-[55px] font-medium">
        Login
      </h1>
      <p className="text-grey-300 mt-3">
        Enter your credentials to access your account
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 lg:mt-[52px] flex flex-col gap-2 md:gap-4 lg:gap-5"
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
        </div>
        <small className="text-right">
          Forgot Password?
          <Link href="/" className="text-primary-600 ml-1">
            Reset
          </Link>
        </small>
        <Button isLoading={isPending} size="lg" type="submit">
          Login
        </Button>
      </form>
    </>
  );
};

export default Page;
