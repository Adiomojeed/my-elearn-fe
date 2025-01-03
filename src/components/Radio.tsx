import React from "react";

const Radio = ({
  label,
  id,
  required = false,
  name,
  value,
  onChange,
}: {
  label?: string;
  id?: string;
  required?: boolean;
  name?: string;
  value?: any;
  onChange?: (e: any) => void;
}) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="radio"
        value={value}
        name={name}
        required={required}
        className="before:content[''] peer relative h-4 w-4 min-h-4 min-w-4 cursor-pointer appearance-none rounded-full border checked:border-4 border-blue-gray-200 text-accent-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-7 before:w-7 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-accent-500 checked:before:bg-accent-500 hover:before:opacity-10"
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="ms-4 cursor-pointer mt-2 block mb-2 text-xl font-medium"
      >
        {label}
      </label>
    </div>
  );
};

export default Radio;
