"use client";
import { cva, VariantProps } from "class-variance-authority";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { ComponentProps, ReactNode, useRef } from "react";
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
        text: ["sm:w-full", "lgmd:w-[400px]"],
        "text-with-icon": [
          "flex",
          "items-center",
          "justify-between",
          "sm:w-full",
          "lgmd:w-[400px]",
        ],
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
  onClick = () => {},
  ...props
}: ButtonProps) => {
  const handleClick = (e: any) => {
    onClick(e);
  };

  return (
    <button
      {...props}
      className={twMerge(
        buttonStyles({ color, variant, textPosition }),
        className
      )}
      onClick={handleClick}
    >
      {variant != "icon" ? <div className="w-full">{children}</div> : null}

      {icon && variant == "text-with-icon" ? (
        <Image
          src={icon}
          alt="Icon"
          className="ml-auto lgmd:w-[82px] lgmd:h-[46px] sm:w-[60px] sm:h-[30px]"
        />
      ) : null}
      {icon && variant == "icon" ? (
        <div className="size-full grid place-items-center">
          <Image src={icon} width={30} height={20} alt="Icon" />
        </div>
      ) : null}
    </button>
  );
};

export default Button;
