import React from "react";

const Input = ({
  label,
  placeholder = "",
  type = "text",
  id,
  required = false,
  value,
  onChange,
  className,
  size = "base",
}: {
  label?: string;
  placeholder?: string;
  type?: string;
  id?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: any) => void;
  className?: string;
  size?: "md" | "base";
}) => {
  return (
    <div className="">
      {label && (
        <label htmlFor={id} className="block mb-3 text-sm text-grey-500">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className={`bg-white border border-grey-50 text-grey-500 focus:outline-none focus:ring-primary focus:border-primary-500 placeholder:text-grey-200 text-sm rounded-lg focus:ring-[3px] focus:ring-primary-500 focus:ring-opacity-30 block w-full ${
          size === "base" ? "h-[50px] md:h-[56px]" : "h-[38px] text-sm font-normal"
        }  p-4 ${className}`}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
