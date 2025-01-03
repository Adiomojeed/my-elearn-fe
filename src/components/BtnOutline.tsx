import { ReactNode } from "react";

const BtnOutline = ({
  children,
  className,
}: {
  children: string | ReactNode;
  className?: string;
}) => {
  return (
    <button
      type="button"
      className="font-normal rounded-[6px] h-[50px] flex items-center justify-center text-sm px-5 text-white hover:text-dark-900 focus:outline-none border border-white  hover:bg-white focus:z-10 focus:ring-4 focus:ring-gray-100"
    >
      {children}
    </button>
  );
};

export default BtnOutline;
