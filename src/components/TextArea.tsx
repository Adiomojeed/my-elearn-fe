import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

type TextareaProps = {
  label?: string;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  id?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: any) => void;
  disabled?: boolean;
};
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
}: TextareaProps) => {
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

const RichEditor = ({
  label,
  placeholder = "",
  className,
  id,
  required = false,
  value,
  onChange,
  labelClassName,
  disabled,
}: TextareaProps) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className={`block mb-3 text-sm text-grey-500 ${labelClassName}`}
        >
          {label}
        </label>
      )}
      <Editor
        wrapperClassName="bg-white p-3  text-sm border border-grey-50 text-grey-500 focus:outline-none focus:ring-primary focus:border-primary-500 placeholder:text-grey-200 text-sm rounded-lg focus:ring-[3px] focus:ring-primary-500 focus:ring-opacity-30"
        editorClassName="editor-class h-[300px]"
        toolbarClassName="toolbar-class"
        // @ts-ignore
        editorState={value}
        onEditorStateChange={onChange}
        // wrapperStyle={<wrapperStyleObject>}
        // editorStyle={<editorStyleObject>}
        // toolbarStyle={<toolbarStyleObject>}
      />
    </div>
  );
};

export { RichEditor };
export default TextArea;
