import { units } from "@/utils/unitConversions";
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
      <label htmlFor={id} className="block mb-2">
        {label}
      </label>
      <select
        id={id}
        required={required}
        value={value}
        onChange={onChange}
        // onBlur={onChange}
        className={`bg-white border border-gray-300 text-dark-500 focus:outline-none focus:ring-primary focus:border-blue-500  text-sm rounded-[6px] block w-full h-[56px] p-4 ${className}`}
      >
        {children}
      </select>
    </div>
  );
};

export type selectValues = { input: string; unit: units };

const Select2 = ({
  label,
  id,
  className,
  value,
  onChange,
  required,
  type = "text",
  containerClassName,
}: {
  type?: string;
  label?: string;
  value: selectValues;
  className?: string;
  containerClassName?: string;
  id?: string;
  required?: boolean;
  onChange?: (e: { input: string; unit: units }) => void;
}) => {
  const [inputValue, setValue] = useState<selectValues>(value);

  useEffect(() => {
    value && setValue(value);
  }, [value]);

  useEffect(() => {
    // @ts-ignore
    onChange(inputValue);
  }, [inputValue]);
  return (
    <div className={containerClassName}>
      <label htmlFor={id} className="block mb-2">
        {label}
      </label>
      <div className="flex">
        <input
          value={inputValue.input}
          onChange={(e) =>
            setValue({ input: e.target.value, unit: inputValue.unit })
          }
          id={id}
          type={type}
          required={required}
          className="text-[18px] text-dark-500 border border-gray-300 !border-r-0 p-3 rounded-l-[6px] !rounded-r-none w-[60%]"
        />

        <select
          // id={id}
          // required
          value={inputValue.unit}
          className={`bg-white border border-gray-300 text-dark-700 focus:outline-none focus:ring-primary focus:border-blue-500 text-xl font-semibold rounded-r-[6px] block w-[40%] h-[56px] px-4 ${className}`}
          onChange={(e) =>
            setValue({ input: inputValue.input, unit: e.target.value as units })
          }
          onBlur={(e) =>
            setValue({ input: inputValue.input, unit: e.target.value as units })
          }
        >
          <option value="m">m</option>
          <option value="cm">cm</option>
          <option value="mm">mm</option>
          <option value="in">in</option>
          <option value="ft">ft</option>
        </select>
      </div>
    </div>
  );
};

export default Select;
export { Select2 };
