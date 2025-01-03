import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

const layout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <div className="bg-[url('/login-bg.png')] bg-no-repeat bg-cover h-screen w-screen flex-center p-5">
      <div className="bg-white rounded-[13px] w-full max-w-[634px] min-h-[500px] p-5 md:px-8 py-3 md:py-5 pb-8 lg:pb-12 xl:px-10">
        <div className="flex-center">
          <Link href="/">
            <Image src="logo.svg" alt="logo" width={110} height={66} priority />
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
};

export default layout;
