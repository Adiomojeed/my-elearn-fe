"use client";

import { useRegisterUser } from "@/api/auth";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";

const Page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [companyname, setCompanyname] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [rePass, setRePass] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { mutate: registerUser, isPending } = useRegisterUser();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (password !== rePass) {
      setError("Passwords must be the same");
    } else {
      setError(null);
      registerUser({
        email,
        password,
        firstname,
        lastname,
        companyname,
        phoneNo,
      });
    }
  };
  return (
    <>
      <p className="lg:text-lg">Welcome to HydroCIS</p>
      <h6 className="text-xl md:text-2xl font-semibold mt-1">
        Create an account
      </h6>
      <form
        onSubmit={handleSubmit}
        className="mt-4 md:mt-5 flex flex-col gap-2 md:gap-4"
      >
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            placeholder="John"
            id="firstName"
            required
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <Input
            label="Last Name"
            placeholder="Doe"
            id="lastName"
            required
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Company Name"
            placeholder="Company Name"
            id="company"
            required
            value={companyname}
            onChange={(e) => setCompanyname(e.target.value)}
          />
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+2347012345678"
            id="phone"
            required
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </div>
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
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Password"
              type="password"
              placeholder="**********"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="**********"
              id="c_password"
              required
              value={rePass}
              onChange={(e) => setRePass(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-red-400 mt-2">{error}</p>}

          <p
            // href="/"
            className="text-sm md:text-base block mt-4"
          >
            By submitting the form you agree with the HydroCIS{" "}
            <Link href="/" className="text-accent-500">
              Terms of Service, User Agreement
            </Link>{" "}
            and{" "}
            <Link href="/" className="text-accent-500">
              Privacy Policy
            </Link>
          </p>
        </div>
        <Button
          isLoading={isPending}
          size="lg"
          className="font-normal px-6 gap-3"
        >
          Create account
          <Image src="/arrow-right.svg" width={18} height={14.4} alt="" />
        </Button>
        <p className="text-sm md:text-base text-center">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-accent-500 underline">
            Sign in
          </Link>{" "}
        </p>
      </form>
    </>
  );
};

export default Page;
