/** @format */

// import {
//   CloseCircle,
//   CloseSquare,
//   TickCircle,
//   TickSquare,
// } from "iconsax-react";
import Image from "next/image";
import {
  toast,
  type ToastOptions,
  Slide,
  type TypeOptions,
} from "react-toastify";

// import Error from "components/Toast/Error";
// import Warning from "components/Toast/Warning";
// import Success from "components/Toast/Success";

interface ToastProps {
  message: string;
  type: TypeOptions;
}

// eslint-disable-next-line no-shadow
export enum ToastType {
  info = "info",
  success = "success",
  warning = "warning",
  error = "error",
  default = "default",
}

const ToastUI: React.FC<ToastProps> = ({ message, type }) => {
  const color: any = {
    [ToastType.success]: "text-[#12B76A]",
    [ToastType.error]: "text-[#D92D20]",
  };
  const stateIcon: any = {
    // [ToastType.error]: <CloseSquare size="42" color="#D92D20" variant="Bold" />,
    // [ToastType.success]: (
    //   <TickSquare size="42" color="#12B76A" variant="Bold" />
    // ),
    // [ToastType.warning]: <Warning />,
    // [ToastType.error]: <Error />,
    [ToastType.success]: (
      <Image src="/success.svg" width={14.4} height={14.4} alt="" />
    ),
    [ToastType.default]: "",
  };

  const headlineText = {
    [ToastType.info]: "",
    [ToastType.success]: "Success",
    [ToastType.warning]: "Warning",
    [ToastType.error]: "Error",
    [ToastType.default]: "",
  };

  return (
    <div
      className={`flex w-full items-center rounded-[10px] px-4 py-2 text-black shadow-sm md:w-[400px] border ${
        type === "success"
          ? "border-[#23A094] bg-[#D3F3F0]"
          : "bg-red-200 borded-red-500"
      }`}
    >
      <div className="flex items-center gap-[10px] pr-[15px]">
        {stateIcon[type]}

        <div>
          {/* <h6 className={`font-bold ${color[type]}`}>{headlineText[type]}</h6> */}
          <p className="text-sm">{message}</p>
        </div>
      </div>

      <button aria-label="close-toaster" className="ml-auto">
        x
      </button>
    </div>
  );
};

const toastOptions: ToastOptions = {
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  transition: Slide,
  rtl: false,
  closeButton: false,
};

const customToast = (message: string, type: TypeOptions) => {
  toast(<ToastUI message={message} type={type} />, toastOptions);
};

export default customToast;
