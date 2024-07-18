import { cva, VariantProps } from "class-variance-authority";
import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const SmallButtonStyles = cva(
  ["heading-xs", "py-2", "px-5", "rounded-[20px]", "uppercase"],
  {
    variants: {
      color: {
        "dark-purple": ["bg-dark-purple", "text-white", "hover:bg-red"],
        // red: ["bg-red", "text-white"],
        // white: ["bg-white", "text-black"],
        // yellow: ["bg-yellow", "text-black"],
      },
    },
    defaultVariants: {
      color: "dark-purple",
    },
  }
);

export type ButtonVariants = VariantProps<typeof SmallButtonStyles>;

type ButtonProps = ButtonVariants & ComponentProps<"button">;

const SmallButton = ({ color, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(SmallButtonStyles({ color }), className)}
    ></button>
  );
};

export default SmallButton;
