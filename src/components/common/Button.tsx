import React, { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtomPrps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtomPrps>(
  ({ className, children, ...props }) => {
    return (
      <button
        className={twMerge(
          "text-xl mt-2 w-full bg-red-500 text-white py-2 border-2 rounded-md cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
