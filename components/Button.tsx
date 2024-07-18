import { cva, VariantProps } from "class-variance-authority";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(
  [
    "p-5",
    "rounded-[20px]",
    "border-[3px]",
    "border-solid",
    "shadow-[0px_10px_0px_0px]",
    "heading-m",
    "shadow-black",
    "border-black",
    "hover:border-dark-purple",
    "hover:shadow-dark-purple",
    "w-[400px]",
    "uppercase",
    "transition-all",
    "active:translate-y-[4px]",
    "active:scale-[0.98]",
  ],
  {
    variants: {
      color: {
        red: ["bg-red", "text-white"],
        white: ["bg-white", "text-black"],
        yellow: ["bg-yellow", "text-black"],
      },
      variant: {
        text: [],
        "text-with-icon": ["flex", "items-center", "justify-between"],
        icon: [
          "size-[64px]",
          "rounded-full",
          "p-0",
          "flex",
          "items-center",
          "justify-center",
          "shadow-[0px_4px_0px_0px]",
        ],
      },
      textPosition: {
        left: ["text-start"],
        center: ["text-center"],
        right: ["text-end"],
      },
    },
    defaultVariants: {
      color: "white",
      variant: "text",
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonStyles>;

type ButtonProps = ButtonVariants &
  ComponentProps<"button"> & { icon?: StaticImport };

const Button = ({
  children,
  icon,
  variant,
  color,
  className,
  textPosition,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(
        buttonStyles({ color, variant, textPosition }),
        className
      )}
    >
      <div className="w-full">{variant != "icon" ? children : null}</div>

      {icon && variant == "text-with-icon" ? (
        <Image
          src={icon}
          width={82}
          height={46}
          alt="Icon"
          className="ml-auto"
        />
      ) : null}
      {icon && variant == "icon" ? (
        <Image src={icon} width={30} height={20} alt="Icon" />
      ) : null}
    </button>
  );
};

export default Button;
