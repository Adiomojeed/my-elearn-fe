import { ReactNode } from "react";

const Button = ({
  children,
  className,
  type,
  onClick,
  size = "md",
  btnType = "main",
  isLoading,
  disabled,
}: {
  children: string | ReactNode;
  className?: string;
  type?: "submit" | "button";
  onClick?: (e: any) => void;
  size?: "md" | "lg" | "sm";
  btnType?: "main" | "light" | "outline";
  isLoading?: boolean;
  disabled?: boolean;
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`${
        btnType === "main"
          ? "text-white bg-primary-600"
          : btnType === "light"
          ? "text-primary-500 bg-[#FFEEEB]"
          : "text-primary-600 !border !border-solid border-primary-600 hover:bg-primary-600 hover:text-white"
      } focus:ring-4 focus:ring-primary-500 focus:ring-opacity-50 rounded-lg ${
        size === "sm"
          ? `h-[36px] text-sm`
          : size === "md"
          ? `h-[46px]`
          : size === "lg"
          ? `h-[50px] md:h-[55px]`
          : ""
      } ${
        isLoading ? "pointer-events-none" : ""
      } flex relative items-center justify-center px-10 whitespace-nowrap disabled:bg-[#F9FAFB] disabled:!text-grey-300 disabled:hover:!text-grey-300 disabled:!border-0 ${className}`}
      onClick={onClick}
    >
      <div
        className={`w-full h-full flex items-center ${
          isLoading ? "invisible" : "visited:"
        }`}
      >
        {children}
      </div>
      {isLoading && (
        <div className="w-full h-full flex-center absolute">
          <svg
            // aria-hidden="true"
            className="w-4 h-4 mr-2 text-gray-200 animate-spin fill-primary"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      )}
      {/* {isLoading ? (
        <svg
          // aria-hidden="true"
          className="w-4 h-4 mr-2 text-gray-200 animate-spin fill-primary"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      ) : (
        children
      )} */}
    </button>
  );
};

export default Button;
