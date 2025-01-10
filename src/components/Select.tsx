import { MultiSelect, Option } from "react-multi-select-component";

import React, { useEffect, useState } from "react";

const Select = ({
  label,
  id,
  required = false,
  children,
  className,
  value,
  onChange,
}: {
  label?: string;
  className?: string;
  id?: string;
  required?: boolean;
  children: any;
  value?: string;
  onChange?: (e: any) => void;
}) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-3 text-sm text-grey-500">
        {label}
      </label>
      <select
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        // onBlur={onChange}
        className={`bg-white border border-grey-50 text-grey-500 focus:outline-none focus:ring-primary focus:border-primary-500 placeholder:text-grey-200 text-sm rounded-lg focus:ring-[3px] focus:ring-primary-500 focus:ring-opacity-30 block w-full h-[50px] md:h-[56px] p-4 ${className}`}
      >
        {children}
      </select>
    </div>
  );
};

const Select2 = ({
  label,
  id,
  required = false,

  className,
  value,
  onChange,
  options,
}: {
  label?: string;
  className?: string;
  id: string;
  required?: boolean;

  value: Option[];
  options: Option[];
  onChange?: (e: any) => void;
}) => {
  
  return (
    <div>
      <label htmlFor={id} className="block mb-3 text-sm text-grey-500">
        {label}
      </label>
      {/* <select
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        // onBlur={onChange}
        className={`bg-white border border-grey-50 text-grey-500 focus:outline-none focus:ring-primary focus:border-primary-500 placeholder:text-grey-200 text-sm rounded-lg focus:ring-[3px] focus:ring-primary-500 focus:ring-opacity-30 block w-full h-[50px] md:h-[56px] p-4 ${className}`}
      >
        {children}
      </select> */}
      <MultiSelect
        options={options}
        value={value}
        onChange={onChange}
        labelledBy={id}
        // className={`bg-white border border-grey-50 text-grey-500 focus:outline-none focus:ring-primary focus:border-primary-500 placeholder:text-grey-200 text-sm rounded-lg focus:ring-[3px] focus:ring-primary-500 focus:ring-opacity-30 blockw-full h-[50px] md:h-[56px] p4 ${className}`}
      />
    </div>
  );
};

export default Select;
export { Select2 };
