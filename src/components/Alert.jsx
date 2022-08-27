import React from "react";
import {
  MdOutlineError,
  MdDangerous,
  MdCheckCircle,
  MdClose,
} from "react-icons/md";

const COLORS = {
  warning: {
    main: "border-orange-200 bg-orange-100",
    bg: "bg-orange-500",
    text: "text-orange-300 hover:text-orange-700",
  },
  danger: {
    main: "border-red-200 bg-red-100",
    bg: "bg-red-500",
    text: "text-red-300 hover:text-red-700",
  },
  success: {
    main: "border-green-200 bg-green-100",
    bg: "bg-green-500",
    text: "text-green-300 hover:text-green-700",
  },
};

const ICONS = {
  warning: <MdOutlineError className="text-white text-2xl" />,
  danger: <MdDangerous className="text-white text-2xl" />,
  success: <MdCheckCircle className="text-white text-2xl" />,
};

function Alert({ type, title, message, close }) {
  return (
    <div className="absolute z-50 w-screen bottom-5 flex justify-center">
      <div
        className={
          "grid border-2 p-2.5 w-96 rounded-2xl items-center gap-2 " +
          COLORS[type].main
        }
        style={{ gridTemplateColumns: "auto 1fr auto" }}
      >
        <div
          className={
            "h-fit flex place-items-center p-1.5 rounded-full " +
            COLORS[type].bg
          }
        >
          {ICONS[type]}
        </div>
        <div>
          <h5 className="text-sm font-semibold">{title}</h5>
          <p className="text-xs text-gray-600">{message}</p>
        </div>
        <MdClose className={"text-2xl " + COLORS[type].text} onClick={close} />
      </div>
    </div>
  );
}

export default Alert;
