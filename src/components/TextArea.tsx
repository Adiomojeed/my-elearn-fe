import React from "react";

const TextArea = ({
  label,
  placeholder = "",
  className,
  id,
  required = false,
  value,
  onChange,
}: {
  label?: string;
  placeholder?: string;
  className?: string;
  id?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: any) => void;
}) => {
  return (
    <div className="">
      {label && (
        <label htmlFor={id} className="block mb-2 text-dark-500">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={`bg-white border border-gray-300 text-dark-500 focus:outline-none focus:ring-primary focus:border-blue-500  text-sm rounded-[6px] block w-full h-[56px] p-4 min-h-[120px] ${className}`}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default TextArea;
