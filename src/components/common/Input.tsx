import React, {
  HTMLAttributes,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  LabelHTMLAttributes,
} from "react";
import { twMerge } from "tailwind-merge";

interface InputProps {
  className?: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  divProps?: HTMLAttributes<HTMLDivElement>;
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, divProps, labelProps, inputProps }, ref) => {
    return (
      <div
        className={twMerge(className, "flex flex-col mb-3")}
        {...divProps}
      >
        <label
          className={twMerge(className, "text-lg font-semibold")}
          htmlFor={label}
          {...labelProps}
        >
          {label}
        </label>
        <input
          id={label}
          className={twMerge(className, "border-2 p-2 rounded-md h-[50px]")}
          ref={ref}
          {...inputProps}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
