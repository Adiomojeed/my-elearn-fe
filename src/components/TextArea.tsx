import React from "react";

const TextArea = ({
  label,
  placeholder = "",
  className,
  id,
  required = false,
  value,
  onChange,
  labelClassName,
  disabled,
}: {
  label?: string;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  id?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: any) => void;
  disabled?: boolean;
}) => {
  return (
    <div className="">
      {label && (
        <label
          htmlFor={id}
          className={`block mb-3 text-sm text-grey-500 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={`bg-white border border-grey-50 text-grey-500 focus:outline-none focus:ring-primary focus:border-primary-500 placeholder:text-grey-200 text-sm rounded-lg focus:ring-[3px] focus:ring-primary-500 focus:ring-opacity-30 block w-full h-[50px] min-h-[120px] p-4 ${className}`}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        disabled={disabled}
      ></textarea>
    </div>
  );
};

export default TextArea;
